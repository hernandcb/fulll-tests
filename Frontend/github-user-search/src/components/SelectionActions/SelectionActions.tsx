import './SelectionActions.css';
import deleteIcon from './../../assets/delete.svg';
import duplicateIcon from './../../assets/duplicate.svg';

interface SelectionActionsProps {
  selectedCount: number;
  allSelected: boolean;
  showEditModeToggle: boolean;
  popupMessage: string | null;
  editMode?: boolean;
  onToggleSelectAll: () => void;
  onToggleEditMode: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  hidePopupMessage: () => void;
}

export const SelectionActions = (props: SelectionActionsProps) => {
  const {
    selectedCount,
    allSelected,
    showEditModeToggle,
    popupMessage,
    editMode = false,
    onToggleSelectAll,
    onToggleEditMode,
    onDelete,
    onDuplicate,
    hidePopupMessage,
  } = props;

  if (popupMessage) {
    setTimeout(() => {
      console.log('hidding popup');
      hidePopupMessage();
    }, 3000);
  }
  return (
    <section className="selection-actions">
      {showEditModeToggle && (
        <div className="edit-mode-toggle">
          <input
            type="checkbox"
            checked={editMode}
            onChange={onToggleEditMode}
          />
          <label htmlFor="edit-mode-toggle">Edit mode</label>
          <hr />
        </div>
      )}
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
              className="action-button"
            >
              <img src={deleteIcon} width={24} alt="Delete icon" />
              <span className="delete-label">Delete</span>
            </button>

            <button
              onClick={onDuplicate}
              aria-label="Duplicate selected users"
              title="Duplicate selected users"
              className="action-button"
            >
              <img src={duplicateIcon} width={24} alt="Duplicate icon" />
              <span className="duplicate-label">Duplicate</span>
            </button>
          </div>
        )}
      </div>
      <div
        className="popup-message"
        style={{ display: popupMessage ? 'block' : 'none' }}
      >
        {popupMessage}
      </div>
    </section>
  );
};
