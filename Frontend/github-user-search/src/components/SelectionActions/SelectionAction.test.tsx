import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { SelectionActions } from './SelectionActions';

describe('SelectionActions component', () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      usersLength: 5,
      selectedCount: 0,
      allSelected: false,
      onToggleSelectAll: vi.fn(),
      onDelete: vi.fn(),
      onDuplicate: vi.fn(),
    };
    const props = { ...defaultProps, ...propsOverride };
    return props;
  };

  it('should not appear if there are no users', () => {
    // Prepare
    const props = setup({ usersLength: 0 });

    // Render
    render(<SelectionActions {...props} />);

    // Assert
    expect(
      screen.queryByTitle('Delete selected users'),
    ).not.toBeInTheDocument();
  });

  it('should indicate if no users are selected', () => {
    // Prepare
    const props = setup({ selectedCount: 0 });
    // Render
    render(<SelectionActions {...props} />);
    // Assert
    expect(screen.getByText('No users selected')).toBeInTheDocument();
  });

  it('Should hide the buttons if no users are selected', () => {
    // Prepare
    const props = setup({ selectedCount: 0 });
    // Render
    render(<SelectionActions {...props} />);
    // Assert
    expect(
      screen.queryByTitle('Delete selected users'),
    ).not.toBeInTheDocument();
  });

  it('should call the onToggleSelectAll function when the checkbox is clicked', async () => {
    // Prepare
    const onToggleSelectAll = vi.fn();
    const props = setup({ onToggleSelectAll });

    // Render
    const { container } = render(<SelectionActions {...props} />);

    const checkbox = container.querySelector(
      '.selected-items-count input[type="checkbox"]',
    ) as HTMLInputElement;
    await userEvent.click(checkbox);

    // Assert
    expect(checkbox).not.toBeNull();
    expect(onToggleSelectAll).toHaveBeenCalledTimes(1);
  });

  it('should call the onDelete function when the delete button is clicked', async () => {
    // Prepare
    const onDelete = vi.fn();
    const props = setup({ selectedCount: 2, onDelete });

    // Render
    render(<SelectionActions {...props} />);

    const deleteButton = screen.getByTitle('Delete selected users');
    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should call the onDuplicate function when the duplicate button is clicked', async () => {
    // Prepare
    const onDuplicate = vi.fn();
    const props = setup({ selectedCount: 2, onDuplicate });

    // Render
    render(<SelectionActions {...props} />);

    // Assert
    const duplicateButton = screen.getByTitle('Duplicate selected users');
    await userEvent.click(duplicateButton);
    expect(onDuplicate).toHaveBeenCalledTimes(1);
  });

  it('should check the checkbox if allSelected prop is true', () => {
    // Prepare
    const props = setup({ selectedCount: 2, allSelected: true });
    // Render
    const { container } = render(<SelectionActions {...props} />);

    const checkbox = container.querySelector(
      '.selected-items-count input[type="checkbox"]',
    ) as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it('should render the correct number of selected users', () => {
    // When 1 user is selected
    const { rerender } = render(
      <SelectionActions
        selectedCount={1}
        allSelected={false}
        onToggleSelectAll={vi.fn()}
        onDelete={vi.fn()}
        onDuplicate={vi.fn()}
      />,
    );
    expect(screen.getByText('Selected 1 user')).toBeInTheDocument();

    // When 4 users are selected
    rerender(
      <SelectionActions
        selectedCount={4}
        allSelected={false}
        onToggleSelectAll={vi.fn()}
        onDelete={vi.fn()}
        onDuplicate={vi.fn()}
      />,
    );
    expect(screen.getByText('Selected 4 users')).toBeInTheDocument();
  });
});
