export const FeatureItem = ({ title, desc }) => (
  <div className="flex flex-col max-w-md sm:flex-row">
    <div className="mb-4 mr-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
        <svg
          className="w-8 h-8 text-primary sm:w-10 sm:h-10"
          stroke="currentColor"
          viewBox="0 0 52 52"
        >
          <polygon
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            points="29 13 14 29 25 29 23 39 38 23 27 23"
          />
        </svg>
      </div>
    </div>
    <div>
      <h6 className="mb-3 text-xl text-text font-bold leading-5">{title}</h6>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  </div>
);

