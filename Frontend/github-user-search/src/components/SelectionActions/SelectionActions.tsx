import './SelectionActions.css';
import deleteIcon from './../../assets/delete.svg';
import duplicateIcon from './../../assets/duplicate.svg';

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
      <div className="selected-items-count">
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
        <div className="buttons">
          <button
            onClick={onDuplicate}
            aria-label="Delete selected users"
            title="Delete"
          >
            <img src={deleteIcon} width={24} alt="Delete selected users" />
          </button>

          <button
            onClick={onDelete}
            aria-label="Duplicate selected users"
            title="Duplicate users"
          >
            <img
              src={duplicateIcon}
              width={24}
              alt="Duplicate selected users"
            />
          </button>
        </div>
      )}
    </section>
  );
};
