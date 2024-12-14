import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import theme from '../../../theme';
import MainLayout from '../MainLayout';

const renderMainLayout = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('MainLayout', () => {
  // it('renders the layout with content', () => {
  //   renderMainLayout();
  //   expect(screen.getByText('Test Content')).toBeInTheDocument();
  // });

  // it('toggles sidebar when menu button is clicked', () => {
  //   renderMainLayout();
  //   const menuButton = screen.getByLabelText('open drawer');
  //   fireEvent.click(menuButton);
    
  //   // Check if the drawer content is visible
  //   expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
    
  //   // Click the backdrop to close
  //   const backdrop = screen.getByRole('presentation');
  //   fireEvent.click(backdrop);
  //   expect(screen.queryByText('DASHBOARD')).not.toBeInTheDocument();
  // });

  it('toggles chat panel when chat button is clicked', async () => {
    renderMainLayout();
    // Find the chat button
    const chatButton = screen.getByTestId('chat-toggle');
    fireEvent.click(chatButton);
    
    // Check if chat panel is open
    const selectAgent = screen.getByLabelText('Select Agent');
    expect(selectAgent).toBeInTheDocument();
    
    // Click backdrop to close
    const backdrop = screen.getByLabelText('close chat');
    fireEvent.click(backdrop);
    
    // Wait for the chat panel to be removed
    await waitFor(() => {
      expect(screen.queryByLabelText('Select Agent')).not.toBeInTheDocument();
    });
  });

  // it('renders all navigation items', () => {
  //   renderMainLayout();
  //   const menuButton = screen.getByLabelText('open drawer');
  //   fireEvent.click(menuButton);
    
  //   // Wait for the navigation items to be visible
  //   const mainNavItems = ['Dashboard', 'Projects', 'Analytics'];
  //   const secondaryNavItems = ['Team', 'Messages', 'Settings'];
    
  //   // Check all navigation items
  //   [...mainNavItems, ...secondaryNavItems].forEach(item => {
  //     expect(screen.getByRole('button', { name: new RegExp(item, 'i') })).toBeInTheDocument();
  //   });
  // });

  // it('shows correct navigation item as active based on current route', () => {
  //   renderMainLayout();
  //   const menuButton = screen.getByLabelText('open drawer');
  //   fireEvent.click(menuButton);
    
  //   // Default route should be dashboard
  //   const dashboardButton = screen.getByRole('button', { name: /dashboard/i });
  //   expect(dashboardButton).toHaveClass('Mui-selected');
  // });
});
