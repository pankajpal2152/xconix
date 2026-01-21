import { useNavigate } from "react-router-dom";
import "./LenderToolbar.css";

export default function LenderToolbar({
  searchPlaceholder,
  addButtonLabel = "Add More",
  addRoute = "/lenders/add",
  onSearch,
}) {
  const navigate = useNavigate();

  return (
    <div className="lender-toolbar-wrapper">
      <div className="lender-toolbar">
        <div className="lender-search">
          <input
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button
          className="add-more-btn"
          onClick={() => navigate(addRoute)}
        >
          + {addButtonLabel}
        </button>
      </div>
    </div>
  );
}
