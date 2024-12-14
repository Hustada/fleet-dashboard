import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { renderWithTheme } from '../../test/test-utils';

describe('Dashboard', () => {
  beforeEach(() => {
    renderWithTheme(<Dashboard />);
  });

  it('renders the dashboard title', () => {
    expect(screen.getByText('AI Agents Dashboard')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays stats cards after loading', async () => {
    await waitFor(() => {
      expect(screen.getByText('Active Agents')).toBeInTheDocument();
      expect(screen.getByText('Tasks in Queue')).toBeInTheDocument();
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(screen.getByText('Completed Today')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays agent list after loading', async () => {
    await waitFor(() => {
      expect(screen.getByText('Content Writer')).toBeInTheDocument();
      expect(screen.getByText('Code Assistant')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
