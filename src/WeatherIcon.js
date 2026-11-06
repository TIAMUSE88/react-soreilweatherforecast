const ICON_BASE_URL = "https://maps.gstatic.com/weather/v1";

function getFallbackIconUrl(condition) {
  const description = condition?.toLowerCase() ?? "";
  let icon = "cloudy";

  if (description.includes("hail")) {
    icon = description.includes("shower") ? "wintry_mix" : "sleet_hail";
  } else if (
    description.includes("sleet") ||
    (description.includes("rain") && description.includes("snow"))
  ) {
    icon = "wintry_mix";
  } else if (description.includes("snow")) {
    if (description.includes("blowing")) {
      icon = "blowing_snow";
    } else if (description.includes("heavy")) {
      icon = "heavy_snow";
    } else if (description.includes("shower")) {
      icon = "scattered_snow";
    } else if (description.includes("light")) {
      icon = "flurries";
    } else {
      icon = "snow_showers";
    }
  } else if (description.includes("thunder") || description.includes("storm")) {
    icon = "strong_tstorms";
  } else if (
    description.includes("scattered") &&
    description.includes("shower")
  ) {
    icon = "scattered_showers";
  } else if (description.includes("drizzle")) {
    icon = "drizzle";
  } else if (description.includes("rain") || description.includes("shower")) {
    icon = description.includes("heavy") ? "heavy" : "showers";
  } else if (
    description.includes("mist") ||
    description.includes("fog") ||
    description.includes("haze")
  ) {
    icon = "mist";
  } else if (description.includes("smoke")) {
    icon = "smoke";
  } else if (description.includes("dust") || description.includes("sand")) {
    icon = "dust";
  } else if (description.includes("wind")) {
    icon = description.includes("rain") ? "showers" : "windy_breezy";
  } else if (
    description.includes("mostly clear") ||
    description.includes("mostly sunny") ||
    description.includes("few clouds")
  ) {
    icon = "mostly_sunny";
  } else if (description.includes("partly")) {
    icon = "partly_cloudy";
  } else if (
    description.includes("mostly cloudy") ||
    description.includes("broken clouds")
  ) {
    icon = "mostly_cloudy";
  } else if (description.includes("clear") || description.includes("sun")) {
    icon = "sunny";
  } else if (
    description.includes("cloud") ||
    description.includes("overcast")
  ) {
    icon = "cloudy";
  }

  return `${ICON_BASE_URL}/${icon}.svg`;
}

export default function WeatherIcon({ src, alt, className, condition }) {
  const fallbackIconUrl = getFallbackIconUrl(condition);

  function handleError(event) {
    if (event.currentTarget.src !== fallbackIconUrl) {
      event.currentTarget.src = fallbackIconUrl;
    }
  }

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
}
