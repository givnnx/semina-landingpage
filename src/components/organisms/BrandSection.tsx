export default function BrandSection({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <section className={`py-14 lg:py-20 text-center ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className={`text-base sm:text-lg font-medium mb-8 sm:mb-10 ${
            variant === "dark" ? "text-gray-text" : "text-muted-light"
          }`}
        >
          Events held by top & biggest global companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          <img
            src="/images/apple-111.svg"
            alt="Apple"
            className="h-7 sm:h-8 w-auto opacity-85 hover:opacity-100 transition-opacity"
          />
          <img
            src="/images/Adobe.svg"
            alt="Adobe"
            className="h-7 sm:h-8 w-auto opacity-85 hover:opacity-100 transition-opacity"
          />
          <img
            src="/images/slack-21.svg"
            alt="Slack"
            className="h-7 sm:h-8 w-auto opacity-85 hover:opacity-100 transition-opacity"
          />
          <img
            src="/images/spotify-11.svg"
            alt="Spotify"
            className="h-7 sm:h-8 w-auto opacity-85 hover:opacity-100 transition-opacity"
          />
          <img
            src="/images/google-2015.svg"
            alt="Google"
            className="h-7 sm:h-8 w-auto opacity-85 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
}
