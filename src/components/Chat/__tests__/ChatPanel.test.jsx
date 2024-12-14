import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import theme from '../../../theme';
import ChatPanel from '../ChatPanel';

// Mock agents for testing
const mockAgents = [
  {
    id: '1',
    name: 'Content Writer',
    role: 'Writer',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Code Assistant',
    role: 'Coder',
    status: 'Busy',
  },
];

const renderChatPanel = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ChatPanel agents={mockAgents} onClose={() => {}} {...props} />
    </ThemeProvider>
  );
};

describe('ChatPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Chat UI Elements', () => {
    it('renders the chat header and close button', () => {
      renderChatPanel();
      expect(screen.getByText('Chat')).toBeDefined();
      expect(screen.getByLabelText('close')).toBeDefined();
    });

    it('renders the agent dropdown with correct options', async () => {
      renderChatPanel();
      
      // Open the select dropdown
      const select = screen.getByRole('combobox');
      fireEvent.mouseDown(select);

      // Wait for the dropdown to appear
      const listbox = screen.getByRole('listbox');
      
      // Check if options are rendered within the listbox
      mockAgents.forEach(agent => {
        expect(within(listbox).getByText(`${agent.name} (${agent.role})`)).toBeDefined();
      });
    });
  });

  describe('Chat Functionality', () => {
    it('starts with disabled input until agent is selected', () => {
      renderChatPanel();
      const input = screen.getByPlaceholderText('Select an agent to start chatting');
      expect(input.disabled).toBe(true);
    });

    it('enables input after selecting an agent', async () => {
      renderChatPanel();
      
      // Open select dropdown
      const select = screen.getByRole('combobox');
      fireEvent.mouseDown(select);

      // Select first agent
      const option = screen.getByText('Content Writer (Writer)');
      fireEvent.click(option);
      
      // Check if input is enabled
      const input = screen.getByPlaceholderText('Type a message...');
      expect(input.disabled).toBe(false);
    });

    it('sends and receives messages', async () => {
      renderChatPanel();
      
      // Select agent
      const select = screen.getByRole('combobox');
      fireEvent.mouseDown(select);
      const option = screen.getByText('Content Writer (Writer)');
      fireEvent.click(option);
      
      // Send message
      const input = screen.getByPlaceholderText('Type a message...');
      fireEvent.change(input, { target: { value: 'Hello' } });
      fireEvent.click(screen.getByLabelText('send message'));
      
      // Check user message
      expect(screen.getByText('Hello')).toBeDefined();
      
      // Fast-forward timer to trigger bot response
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      // Check bot response
      expect(screen.getByText('I am the Writer. I can help you with writer-related tasks.')).toBeDefined();
    });
  });

  describe('Chat Panel Controls', () => {
    it('closes when close button is clicked', () => {
      const onClose = vi.fn();
      renderChatPanel({ onClose });
      
      fireEvent.click(screen.getByLabelText('close'));
      expect(onClose).toHaveBeenCalled();
    });

    it('clears chat when switching agents', async () => {
      renderChatPanel();
      
      // Select first agent
      const select = screen.getByRole('combobox');
      fireEvent.mouseDown(select);
      fireEvent.click(screen.getByText('Content Writer (Writer)'));
      
      // Send a message
      const input = screen.getByPlaceholderText('Type a message...');
      fireEvent.change(input, { target: { value: 'Hello' } });
      fireEvent.click(screen.getByLabelText('send message'));
      
      // Verify message is shown
      expect(screen.getByText('Hello')).toBeDefined();
      
      // Switch to second agent
      fireEvent.mouseDown(select);
      fireEvent.click(screen.getByText('Code Assistant (Coder)'));
      
      // Previous messages should be cleared
      expect(screen.queryByText('Hello')).toBeNull();
    });
  });
});
