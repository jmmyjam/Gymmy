interface Props {
  image: string;
  title: string;
  size: number[];
  message: string;
  onClose?: () => void;
}

function Toast({ image, title, size, message, onClose }: Props) {
  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <img
          src={image}
          className="rounded me-2"
          alt="..."
          width={size[0]}
          height={size[1]}
        />
        <strong className="me-auto">{title}</strong>
        <small>Just now</small>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">{message}.</div>
    </div>
  );
}

export default Toast;
