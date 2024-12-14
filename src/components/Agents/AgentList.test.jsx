import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentList from './AgentList';
import { renderWithTheme } from '../../test/test-utils';

const mockAgents = [
  {
    id: '1',
    name: 'Content Writer',
    role: 'Writer',
    status: 'Active',
    currentTask: 'Writing blog post',
    progress: 75,
    tasksCompleted: 10,
    activities: []
  },
  {
    id: '2',
    name: 'Code Assistant',
    role: 'Developer',
    status: 'Idle',
    currentTask: null,
    progress: 0,
    tasksCompleted: 5,
    activities: []
  }
];

describe('AgentList', () => {
  it('shows loading state initially', () => {
    renderWithTheme(<AgentList agents={mockAgents} isLoading={true} />);
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  beforeEach(() => {
    renderWithTheme(<AgentList agents={mockAgents} isLoading={false} />);
  });

  it('displays agent cards after loading', async () => {
    await waitFor(() => {
      expect(screen.getByText('Content Writer')).toBeInTheDocument();
      expect(screen.getByText('Code Assistant')).toBeInTheDocument();
    });
  });

  it('displays agent status indicators', async () => {
    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Idle')).toBeInTheDocument();
    });
  });

  it('allows selecting an agent', async () => {
    const user = userEvent.setup();
    
    const agentCard = screen.getByText('Content Writer').closest('.MuiCard-root');
    await user.click(agentCard);
    
    expect(agentCard).toHaveClass('Mui-selected');
  });
});
