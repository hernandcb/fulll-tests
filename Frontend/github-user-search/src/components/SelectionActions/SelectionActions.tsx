import './SelectionActions.css';
import deleteIcon from './../../assets/delete.svg';
import duplicateIcon from './../../assets/duplicate.svg';

interface SelectionActionsProps {
  selectedCount: number;
  allSelected: boolean;
  onToggleSelectAll: () => void;
  onToggleEditMode: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  editMode?: boolean;
}

export const SelectionActions = (props: SelectionActionsProps) => {
  const {
    selectedCount,
    allSelected,
    editMode = false,
    onToggleSelectAll,
    onToggleEditMode,
    onDelete,
    onDuplicate,
  } = props;
  return (
    <section className="selection-actions">
      {/* {selectedCount > 0 && ( */}
      <div className="edit-mode-toggle">
        <input type="checkbox" checked={editMode} onChange={onToggleEditMode} />
        <label htmlFor="edit-mode-toggle">Edit mode</label>
        <hr />
      </div>
      {/* )} */}
      <div className="actions">
        {editMode && (
          <div className="selected-items-count">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleSelectAll}
            />
            {selectedCount > 0
              ? `Selected ${selectedCount} user${selectedCount > 1 ? 's' : ''}`
              : 'No users selected'}
          </div>
        )}
        {editMode && selectedCount > 0 && (
          <div className="buttons">
            <button
              onClick={onDelete}
              aria-label="Delete selected users"
              title="Delete selected users"
            >
              <img src={deleteIcon} width={24} alt="Delete icon" />
            </button>

            <button
              onClick={onDuplicate}
              aria-label="Duplicate selected users"
              title="Duplicate selected users"
            >
              <img src={duplicateIcon} width={24} alt="Duplicate icon" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
