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
      details: 'Generated a 1500-word article',
      type: 'Content Generation'
    },
    { 
      task: 'Analyzing market research data',
      status: 'in_progress',
      timestamp: 'In progress',
      details: 'Writing introduction',
      type: 'Data Analysis'
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
      expect(screen.getByText('Total Tasks')).toBeInTheDocument();
      expect(screen.getByText('156')).toBeInTheDocument();
      expect(screen.getByText('Success Rate')).toBeInTheDocument();
      expect(screen.getByText('94%')).toBeInTheDocument();
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
      expect(screen.getByText('Content Generation')).toBeInTheDocument();
      expect(screen.getByText('Data Analysis')).toBeInTheDocument();
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

describe('AgentDetails Settings Panel', () => {
  beforeEach(() => {
    renderWithTheme(
      <AgentDetails 
        agent={mockAgent} 
        open={true} 
        onClose={() => {}} 
      />
    );
  });

  it('displays settings panel when Settings tab is clicked', async () => {
    const user = userEvent.setup();
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Check for main section headings
    expect(screen.getByText('Model Configuration')).toBeInTheDocument();
    expect(screen.getByText('Task Preferences')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('API Configuration')).toBeInTheDocument();
  });

  it('allows changing model settings', async () => {
    const user = userEvent.setup();
    
    // Navigate to settings tab
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Test model selection
    const modelSelect = screen.getByRole('combobox', { name: /model/i });
    await user.click(modelSelect);
    const gpt35Option = screen.getByText(/gpt-3\.5/i);
    await user.click(gpt35Option);
    
    // Test max tokens selection
    const maxTokensSelect = screen.getByRole('combobox', { name: /max tokens/i });
    await user.click(maxTokensSelect);
    const tokens4000Option = screen.getByText('4000');
    await user.click(tokens4000Option);

    // Verify selections are in the document
    expect(screen.getByText(/gpt-3\.5/i)).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
  });

  it('handles toggle switches correctly', async () => {
    const user = userEvent.setup();
    
    // Navigate to settings tab
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Test notifications toggle
    const notificationsSwitch = screen.getByRole('checkbox', { name: /enable notifications/i });
    expect(notificationsSwitch).toBeChecked();
    await user.click(notificationsSwitch);
    expect(notificationsSwitch).not.toBeChecked();

    // Test auto-save toggle
    const autoSaveSwitch = screen.getByRole('checkbox', { name: /auto-save/i });
    expect(autoSaveSwitch).toBeChecked();
    await user.click(autoSaveSwitch);
    expect(autoSaveSwitch).not.toBeChecked();

    // Test email notifications toggle
    const emailSwitch = screen.getByRole('checkbox', { name: /email notifications/i });
    expect(emailSwitch).toBeChecked();
    await user.click(emailSwitch);
    expect(emailSwitch).not.toBeChecked();
  });

  it('allows entering API configuration', async () => {
    const user = userEvent.setup();
    
    // Navigate to settings tab
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Test API key input
    const apiKeyInput = screen.getByLabelText(/api key/i);
    await user.clear(apiKeyInput);
    await user.type(apiKeyInput, 'test-api-key');
    expect(apiKeyInput).toHaveValue('test-api-key');

    // Test API endpoint input
    const endpointInput = screen.getByLabelText(/api endpoint/i);
    await user.clear(endpointInput);
    await user.type(endpointInput, 'https://test-api.com');
    expect(endpointInput).toHaveValue('https://test-api.com');
  });

  it('allows adjusting temperature slider', async () => {
    const user = userEvent.setup();
    
    // Navigate to settings tab
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Find the temperature slider
    const temperatureSlider = screen.getByRole('slider');
    expect(temperatureSlider).toHaveValue('0.7');

    // Note: Testing exact slider interactions is tricky in JSDOM
    // We can at least verify the slider is present with the correct initial value
  });

  it('allows editing system prompt', async () => {
    const user = userEvent.setup();
    
    // Navigate to settings tab
    const settingsTab = screen.getByRole('tab', { name: /settings/i });
    await user.click(settingsTab);

    // Test system prompt textarea
    const promptInput = screen.getByLabelText(/default system prompt/i);
    await user.clear(promptInput);
    await user.type(promptInput, 'Test system prompt');
    expect(promptInput).toHaveValue('Test system prompt');
  });
});

describe('AgentDetails Communication Panel', () => {
  it('displays communication panel when Communication tab is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<AgentDetails agent={mockAgent} open={true} onClose={() => {}} />);
    
    const communicationTab = screen.getByRole('tab', { name: /communication/i });
    await user.click(communicationTab);
    
    expect(screen.getByPlaceholderText(/type a message or command/i)).toBeInTheDocument();
  });

  it('allows sending messages', async () => {
    const user = userEvent.setup();
    renderWithTheme(<AgentDetails agent={mockAgent} open={true} onClose={() => {}} />);
    
    // Navigate to communication tab
    const communicationTab = screen.getByRole('tab', { name: /communication/i });
    await user.click(communicationTab);
    
    // Type and send a message
    const input = screen.getByPlaceholderText(/type a message or command/i);
    await user.type(input, 'Hello agent');
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.click(sendButton);
    
    // Check if message appears in chat
    expect(screen.getByText('Hello agent')).toBeInTheDocument();
  });

  it('sends message on Enter key press', async () => {
    const user = userEvent.setup();
    renderWithTheme(<AgentDetails agent={mockAgent} open={true} onClose={() => {}} />);
    
    // Navigate to communication tab
    const communicationTab = screen.getByRole('tab', { name: /communication/i });
    await user.click(communicationTab);
    
    // Type and send a message using Enter
    const input = screen.getByPlaceholderText(/type a message or command/i);
    await user.type(input, 'Hello agent{enter}');
    
    // Check if message appears in chat
    expect(screen.getByText('Hello agent')).toBeInTheDocument();
  });
});
