import React from "react";

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>Are you sure you want to delete this event?</div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          yes
        </button>
        <button className="form-control btn btn-primary" type="submit">
          no
        </button>
      </div>
    </form>
  );
};
export default Form;