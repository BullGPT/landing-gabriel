/**
 * Icônes des cartes méthode.
 *
 * Chaque icône embarque ses propres dégradés, masque, filtre et clip-path.
 * Les identifiants sont préfixés par icône : deux `url(#...)` identiques dans
 * la même page se télescoperaient et la seconde icône hériterait des défs de
 * la première.
 */

const GLASS_DARK = (
  <>
    <stop stopColor="rgba(87, 87, 87, 1)" />
    <stop offset="1" stopColor="rgba(21, 21, 21, 1)" />
  </>
);

const GLASS_BODY = (
  <>
    <stop stopColor="rgba(227, 227, 229, 0.6)" />
    <stop offset="1" stopColor="rgba(187, 187, 192, 0.6)" />
  </>
);

const GLASS_LIGHT = (
  <>
    <stop stopColor="rgba(255, 255, 255, 1)" />
    <stop offset="1" stopColor="rgba(255, 255, 255, 1)" stopOpacity="0" />
  </>
);

const SIGNAL_RING =
  "M3.55078 3.96389C3.90457 3.53981 4.54209 3.54213 4.93262 3.93264L7.05273 6.05276C5.78524 7.32031 5 9.07031 5 11C5.00006 12.9297 5.78519 14.6798 7.05273 15.9473L4.93262 18.0674C4.54209 18.4577 3.90453 18.4601 3.55078 18.0362C1.9588 16.1277 1.00005 13.6735 1 11C1 8.32653 1.95885 5.87234 3.55078 3.96389ZM19.0674 3.93264C19.4579 3.54213 20.0954 3.53981 20.4492 3.96389C22.0411 5.87234 23 8.32653 23 11C23 13.6735 22.0412 16.1277 20.4492 18.0362C20.0955 18.4601 19.4579 18.4577 19.0674 18.0674L16.9473 15.9473C18.2148 14.6798 18.9999 12.9297 19 11C19 9.07031 18.2148 7.32031 16.9473 6.05276L19.0674 3.93264ZM12 8.00002C13.6541 8.00002 15 9.34593 15 11C14.9999 12.6541 13.6541 14 12 14C10.3459 14 9.00006 12.6541 9 11C9 9.34593 10.3459 8.00002 12 8.00002Z";

const SIGNAL_CORE =
  "M12 12C12.5523 12 13 12.4477 13 13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13C11 12.4477 11.4477 12 12 12ZM17.6543 5.3457C19.1028 6.79422 20 8.79409 20 11C20 13.2059 19.1028 15.2058 17.6543 16.6543L12 11L6.3457 16.6543C4.89718 15.2058 4 13.2059 4 11C4 8.79409 4.89718 6.79422 6.3457 5.3457L12 11L17.6543 5.3457Z";

/** Analyse : l'IA capte le signal du marché. */
export function IconSignal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={SIGNAL_CORE} fill="url(#sig-g0)" mask="url(#sig-mask)" />
      <path
        d={SIGNAL_CORE}
        fill="url(#sig-g0)"
        filter="url(#sig-filter)"
        clipPath="url(#sig-clip)"
      />
      <path d={SIGNAL_RING} fill="url(#sig-g1)" />
      <path
        d="M14.25 11C14.25 9.76012 13.2399 8.75 12 8.75C10.7601 8.75 9.75 9.76012 9.75 11C9.75 12.2399 10.7601 13.25 12 13.25V14C10.3459 14 9 12.6541 9 11C9 9.34591 10.3459 8 12 8C13.6541 8 15 9.34591 15 11C15 12.6541 13.6541 14 12 14V13.25C13.2399 13.25 14.25 12.2399 14.25 11Z"
        fill="url(#sig-g2)"
      />
      <path
        d="M19.0674 3.93274C19.4579 3.54229 20.0954 3.53993 20.4492 3.96399C22.0411 5.87243 23 8.32664 23 11.0001C22.9999 13.6736 22.0412 16.1279 20.4492 18.0363L20.3789 18.1115C20.0402 18.4355 19.5102 18.4347 19.1436 18.1359L19.0674 18.0675L16.9473 15.9474C17.1243 15.7703 17.2908 15.5829 17.4482 15.3878L19.5977 17.5372C19.6483 17.5877 19.71 17.6083 19.7617 17.6075C19.8093 17.6068 19.8453 17.589 19.873 17.5558C21.3571 15.7767 22.2499 13.491 22.25 11.0001C22.25 8.50917 21.3571 6.22355 19.873 4.44446C19.8453 4.41115 19.8093 4.39346 19.7617 4.3927C19.71 4.39198 19.6483 4.41243 19.5977 4.46301L17.4482 6.61145C17.291 6.41658 17.1242 6.22975 16.9473 6.05286L19.0674 3.93274ZM3.55078 3.96399C3.90455 3.53993 4.54209 3.54229 4.93262 3.93274L7.05273 6.05286C6.8757 6.2299 6.70817 6.41641 6.55078 6.61145L4.40234 4.46301C4.35172 4.41243 4.29003 4.39198 4.23828 4.3927C4.19066 4.39346 4.15474 4.41115 4.12695 4.44446C2.64291 6.22355 1.75 8.50917 1.75 11.0001C1.75006 13.491 2.64288 15.7767 4.12695 17.5558C4.15472 17.589 4.19073 17.6068 4.23828 17.6075C4.28999 17.6083 4.35174 17.5877 4.40234 17.5372L6.55078 15.3878C6.70831 15.5831 6.87552 15.7702 7.05273 15.9474L4.93262 18.0675L4.85645 18.1359C4.46342 18.4562 3.88244 18.4336 3.55078 18.0363C1.95885 16.1279 1.00006 13.6736 1 11.0001C1 8.49377 1.84276 6.18013 3.25977 4.32825L3.55078 3.96399Z"
        fill="url(#sig-g3)"
      />
      <defs>
        <linearGradient
          id="sig-g0"
          x1="12"
          y1="5.346"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_DARK}
        </linearGradient>
        <linearGradient
          id="sig-g1"
          x1="12"
          y1="3.643"
          x2="12"
          y2="18.357"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_BODY}
        </linearGradient>
        <linearGradient
          id="sig-g2"
          x1="12"
          y1="8"
          x2="12"
          y2="11.475"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <linearGradient
          id="sig-g3"
          x1="12"
          y1="3.643"
          x2="12"
          y2="12.164"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <filter
          id="sig-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="2" in="SourceGraphic" edgeMode="none" />
        </filter>
        <clipPath id="sig-clip">
          <path d={SIGNAL_RING} />
        </clipPath>
        <mask id="sig-mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d={SIGNAL_RING} fill="#000" />
        </mask>
      </defs>
    </svg>
  );
}

const TEAM_SIDES =
  "M5.29395 13C7.89293 13 10 15.1071 10 17.7061C9.99991 18.4206 9.42064 18.9999 8.70605 19H1.29395C0.579361 18.9999 9.3014e-05 18.4206 0 17.7061C0 15.1071 2.10707 13 4.70605 13H5.29395ZM19.2939 13C21.8929 13 24 15.1071 24 17.7061C23.9999 18.4206 23.4206 18.9999 22.7061 19H15.2939C14.5794 18.9999 14.0001 18.4206 14 17.7061C14 15.1071 16.1071 13 18.7061 13H19.2939ZM5 6.5C6.38071 6.5 7.5 7.61929 7.5 9C7.5 10.3807 6.38071 11.5 5 11.5C3.61929 11.5 2.5 10.3807 2.5 9C2.5 7.61929 3.61929 6.5 5 6.5ZM19 6.5C20.3807 6.5 21.5 7.61929 21.5 9C21.5 10.3807 20.3807 11.5 19 11.5C17.6193 11.5 16.5 10.3807 16.5 9C16.5 7.61929 17.6193 6.5 19 6.5Z";

const TEAM_CENTER =
  "M12.3076 12C16.556 12 20 15.444 20 19.6924C20 20.9668 18.9668 22 17.6924 22H6.30762C5.03317 22 4.00004 20.9668 4 19.6924C4 15.444 7.44404 12 11.6924 12H12.3076ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2Z";

/** Entourage : le groupe qui corrige. */
export function IconTeam() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={TEAM_SIDES} fill="url(#team-g0)" mask="url(#team-mask)" />
      <path
        d={TEAM_SIDES}
        fill="url(#team-g0)"
        filter="url(#team-filter)"
        clipPath="url(#team-clip)"
      />
      <path d={TEAM_CENTER} fill="url(#team-g1)" />
      <path
        d="M15.25 6C15.25 4.20507 13.7949 2.75 12 2.75C10.2051 2.75 8.75 4.20507 8.75 6C8.75 7.79493 10.2051 9.25 12 9.25V10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10V9.25C13.7949 9.25 15.25 7.79493 15.25 6Z"
        fill="url(#team-g2)"
      />
      <path
        d="M17.6924 21.25V22H6.30762V21.25H17.6924ZM19.25 19.6924C19.25 15.8583 16.1417 12.75 12.3076 12.75H11.6924C7.85825 12.75 4.75 15.8583 4.75 19.6924C4.75004 20.5526 5.44739 21.25 6.30762 21.25V22C5.11295 22 4.13009 21.0921 4.01172 19.9287L4 19.6924C4 15.5767 7.23229 12.2156 11.2969 12.0098L11.6924 12H12.3076C16.556 12 20 15.444 20 19.6924L19.9883 19.9287C19.8778 21.0145 19.0145 21.8778 17.9287 21.9883L17.6924 22V21.25C18.5526 21.25 19.25 20.5526 19.25 19.6924Z"
        fill="url(#team-g3)"
      />
      <defs>
        <linearGradient
          id="team-g0"
          x1="12"
          y1="6.5"
          x2="12"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_DARK}
        </linearGradient>
        <linearGradient
          id="team-g1"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_BODY}
        </linearGradient>
        <linearGradient
          id="team-g2"
          x1="12"
          y1="2"
          x2="12"
          y2="6.633"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <linearGradient
          id="team-g3"
          x1="12"
          y1="12"
          x2="12"
          y2="17.791"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <filter
          id="team-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="2" in="SourceGraphic" edgeMode="none" />
        </filter>
        <clipPath id="team-clip">
          <path d={TEAM_CENTER} />
        </clipPath>
        <mask id="team-mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d={TEAM_CENTER} fill="#000" />
        </mask>
      </defs>
    </svg>
  );
}

const MAP_BRACKET =
  "M13 10H17C18.6569 10 20 11.3431 20 13V18C20 18.5523 19.5523 19 19 19C18.4477 19 18 18.5523 18 18V13C18 12.4477 17.5523 12 17 12H7C6.44772 12 6 12.4477 6 13V18C6 18.5523 5.55228 19 5 19C4.44772 19 4 18.5523 4 18V13C4 11.3431 5.34315 10 7 10H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V10Z";

const MAP_NODES =
  "M5 15C6.933 15 8.5 16.567 8.5 18.5C8.5 20.433 6.933 22 5 22C3.067 22 1.5 20.433 1.5 18.5C1.5 16.567 3.067 15 5 15ZM19 15C20.933 15 22.5 16.567 22.5 18.5C22.5 20.433 20.933 22 19 22C17.067 22 15.5 20.433 15.5 18.5C15.5 16.567 17.067 15 19 15ZM12 0.5C13.933 0.5 15.5 2.067 15.5 4C15.5 5.933 13.933 7.5 12 7.5C10.067 7.5 8.5 5.933 8.5 4C8.5 2.067 10.067 0.5 12 0.5Z";

/** Répétition : un seul actif, un seul horaire. */
export function IconSitemap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={MAP_BRACKET} fill="url(#map-g0)" mask="url(#map-mask)" />
      <path
        d={MAP_BRACKET}
        fill="url(#map-g0)"
        filter="url(#map-filter)"
        clipPath="url(#map-clip)"
      />
      <path d={MAP_NODES} fill="url(#map-g1)" />
      <path
        d="M14.75 4C14.75 2.48122 13.5188 1.25 12 1.25C10.4812 1.25 9.25 2.48122 9.25 4C9.25 5.51878 10.4812 6.75 12 6.75V7.5C10.067 7.5 8.5 5.933 8.5 4C8.5 2.067 10.067 0.5 12 0.5C13.933 0.5 15.5 2.067 15.5 4C15.5 5.933 13.933 7.5 12 7.5V6.75C13.5188 6.75 14.75 5.51878 14.75 4Z"
        fill="url(#map-g2)"
      />
      <path
        d="M7.75 18.5C7.75 16.9812 6.51878 15.75 5 15.75C3.48122 15.75 2.25 16.9812 2.25 18.5C2.25 20.0188 3.48122 21.25 5 21.25V22C3.067 22 1.5 20.433 1.5 18.5C1.5 16.567 3.067 15 5 15C6.933 15 8.5 16.567 8.5 18.5C8.5 20.433 6.933 22 5 22V21.25C6.51878 21.25 7.75 20.0188 7.75 18.5Z"
        fill="url(#map-g3)"
      />
      <path
        d="M21.75 18.5C21.75 16.9812 20.5188 15.75 19 15.75C17.4812 15.75 16.25 16.9812 16.25 18.5C16.25 20.0188 17.4812 21.25 19 21.25V22C17.067 22 15.5 20.433 15.5 18.5C15.5 16.567 17.067 15 19 15C20.933 15 22.5 16.567 22.5 18.5C22.5 20.433 20.933 22 19 22V21.25C20.5188 21.25 21.75 20.0188 21.75 18.5Z"
        fill="url(#map-g4)"
      />
      <defs>
        <linearGradient
          id="map-g0"
          x1="12"
          y1="4.5"
          x2="12"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_DARK}
        </linearGradient>
        <linearGradient
          id="map-g1"
          x1="12"
          y1="0.5"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_BODY}
        </linearGradient>
        <linearGradient
          id="map-g2"
          x1="12"
          y1="0.5"
          x2="12"
          y2="4.554"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <linearGradient
          id="map-g3"
          x1="5"
          y1="15"
          x2="5"
          y2="19.054"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <linearGradient
          id="map-g4"
          x1="19"
          y1="15"
          x2="19"
          y2="19.054"
          gradientUnits="userSpaceOnUse"
        >
          {GLASS_LIGHT}
        </linearGradient>
        <filter
          id="map-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="2" in="SourceGraphic" edgeMode="none" />
        </filter>
        <clipPath id="map-clip">
          <path d={MAP_NODES} />
        </clipPath>
        <mask id="map-mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d={MAP_NODES} fill="#000" />
        </mask>
      </defs>
    </svg>
  );
}
