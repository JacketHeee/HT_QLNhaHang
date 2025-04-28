

const Overlay = ({ zindex = 40, children }) => {
  return  (
    <div
      className="fixed inset-0 bg-black bg-opacity-50"
      style={{ zIndex: zindex }}>
      {children}
    </div>
  );
};

export default Overlay;