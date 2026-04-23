import React from "react";
import { MapPin, Calendar, Phone, Edit, Trash2 } from "lucide-react";

const ItemCard = ({ item, currentUser, onEdit, onDelete }) => {
  const isOwner =
    currentUser &&
    item.user &&
    (item.user._id === currentUser.id || item.user === currentUser.id);

  return (
    <div className={`item-card ${item.Type.toLowerCase()} fade-in`}>
      <div className="item-header">
        <h3 className="item-title">{item.ItemName}</h3>
        <span className={`item-type ${item.Type.toLowerCase()}`}>
          {item.Type}
        </span>
      </div>

      <p
        style={{
          marginBottom: "1rem",
          color: "var(--text-light)",
          fontSize: "0.875rem",
        }}
      >
        {item.Description}
      </p>

      <div className="item-detail">
        <MapPin size={16} />
        <span>{item.Location}</span>
      </div>
      <div className="item-detail">
        <Calendar size={16} />
        <span>{new Date(item.Date).toLocaleDateString()}</span>
      </div>
      <div className="item-detail">
        <Phone size={16} />
        <span>{item.ContactInfo}</span>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>
        Reported by: {item.user?.Name || "Unknown"}
      </div>

      {isOwner && (
        <div className="item-actions">
          <button
            className="btn"
            style={{ padding: "0.5rem", background: "var(--bg-color)" }}
            onClick={() => onEdit(item)}
          >
            <Edit size={16} />
          </button>
          <button
            className="btn"
            style={{
              padding: "0.5rem",
              background: "#FEE2E2",
              color: "var(--error-color)",
            }}
            onClick={() => onDelete(item._id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
