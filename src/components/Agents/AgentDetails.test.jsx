import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentDetails from './AgentDetails';
import { renderWithTheme } from '../../test/test-utils';

const mockAgent = {
  id: '1',
  name: 'Test Agent',
  role: 'Writer',
  status: 'Active',
  currentTask: 'Writing blog post',
  progress: 75,
  tasksCompleted: 10,
  activities: [
    { 
      task: 'Completed blog post on AI trends',
      status: 'completed',
      timestamp: '2 hours ago',
      details: 'Generated a 1500-word article'
    },
    { 
      task: 'Analyzing market research data',
      status: 'in_progress',
      timestamp: 'In progress',
      details: 'Writing introduction'
    }
  ]
};

describe('AgentDetails', () => {
  it('renders agent details correctly', () => {
    renderWithTheme(
      <AgentDetails 
        agent={mockAgent} 
        open={true} 
        onClose={() => {}} 
      />
    );
    
    // Check for basic agent information
    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('Writer')).toBeInTheDocument();
    
    // Check for tab presence
    expect(screen.getByRole('tab', { name: /activities/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /metrics/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /settings/i })).toBeInTheDocument();
  });

  it('displays metrics correctly', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <AgentDetails 
        agent={mockAgent} 
        open={true} 
        onClose={() => {}} 
      />
    );
    
    // Click on Metrics tab
    const metricsTab = screen.getByRole('tab', { name: /metrics/i });
    await user.click(metricsTab);
    
    // Wait for metrics panel to be displayed
    await waitFor(() => {
      expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
      expect(screen.getByText('127')).toBeInTheDocument();
      expect(screen.getByText('Success Rate')).toBeInTheDocument();
      expect(screen.getByText('98.5%')).toBeInTheDocument();
    });
  });

  it('shows activity history', async () => {
    renderWithTheme(
      <AgentDetails 
        agent={mockAgent} 
        open={true} 
        onClose={() => {}} 
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Completed blog post on AI trends')).toBeInTheDocument();
      expect(screen.getByText('Analyzing market research data')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    renderWithTheme(
      <AgentDetails 
        agent={mockAgent} 
        open={true} 
        onClose={handleClose} 
      />
    );
    
    const closeButton = screen.getByTestId('CloseIcon').closest('button');
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });
});
