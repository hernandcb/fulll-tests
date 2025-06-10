interface SelectionActionsProps {
  selectedCount: number;
  allSelected: boolean;
  onToogleSelectAll: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const SelectionActions = (props: SelectionActionsProps) => {
  const {
    selectedCount,
    allSelected,
    onToogleSelectAll,
    onDelete,
    onDuplicate,
  } = props;
  return (
    <section className="actions">
      <div className="selected-count">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToogleSelectAll}
        />
        {selectedCount > 0
          ? `Selected ${selectedCount} user${selectedCount > 1 ? 's' : ''}`
          : 'No users selected'}
      </div>
      {selectedCount > 0 && (
        <div className="options">
          <button onClick={onDuplicate}>Duplicate</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </section>
  );
};
