export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert" role="alert">
      <p>⚠️ {message}</p>
      {onRetry && <button className="btn" onClick={onRetry}>Retry</button>}
    </div>
  );
}
