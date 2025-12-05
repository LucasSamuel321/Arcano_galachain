import { useState, useMemo } from "react";

/* -------------------------------------------------------
   DUMMY LISTINGS (user-only)
------------------------------------------------------- */
const dummyListings = {
  active: [
    {
      id: "listing-1",
      type: "Creature",
      name: "Glacier Drake",
      faction: "Frost",
      rarity: "Epic",
      tier: "Young",
      price: 420,
      currency: "ARCANO",
      img: "/images/creatures/young_frost.png",
      views: 85,
      favorites: 12,
      createdAt: "2025-02-02",
    },
    {
      id: "listing-2",
      type: "Egg",
      name: "Inferno Egg",
      rarity: "Rare",
      price: 76,
      currency: "ARCANO",
      img: "/images/eggs/inferno_egg.png",
      views: 32,
      favorites: 4,
      createdAt: "2025-02-01",
    },
    {
      id: "listing-3",
      type: "Material",
      name: "Storm Crystal",
      rarity: "Epic",
      price: 12,
      currency: "GALA",
      img: "/images/items/storm_crystal.png",
      views: 57,
      favorites: 3,
      createdAt: "2025-01-31",
    },
  ],

  sold: [
    {
      id: "sold-1",
      type: "Creature",
      name: "Inferno Whelp",
      rarity: "Rare",
      price: 150,
      currency: "ARCANO",
      img: "/images/creatures/baby_inferno.png",
      soldAt: "2025-01-22",
    },
    {
      id: "sold-2",
      type: "Egg",
      name: "Storm Egg",
      rarity: "Epic",
      price: 89,
      currency: "GALA",
      img: "/images/eggs/storm_egg.png",
      soldAt: "2025-01-15",
    },
  ],

  expired: [
    {
      id: "exp-1",
      type: "Egg",
      name: "Frost Egg",
      rarity: "Common",
      price: 20,
      currency: "ARCANO",
      img: "/images/eggs/frost_egg.png",
      expiredAt: "2025-01-10",
    },
  ],
};

/* -------------------------------------------------------
   DUMMY OFFERS
------------------------------------------------------- */
const dummyOffers = {
  received: [
    {
      id: "offer-r-1",
      fromUser: "ElderMage",
      itemType: "Creature",
      name: "Glacier Drake",
      rarity: "Epic",
      price: 380,
      currency: "ARCANO",
      img: "/images/creatures/young_frost.png",
      expiresIn: "6h",
    },
    {
      id: "offer-r-2",
      fromUser: "CryptoBeast",
      itemType: "Egg",
      name: "Inferno Egg",
      rarity: "Rare",
      price: 55,
      currency: "GALA",
      img: "/images/eggs/inferno_egg.png",
      expiresIn: "2h",
    },
  ],

  sent: [
    {
      id: "offer-s-1",
      toUser: "DrakoMaster",
      itemType: "Creature",
      name: "Storm Sprite",
      rarity: "Common",
      price: 15,
      currency: "ARCANO",
      img: "/images/creatures/baby_storm.png",
      status: "Pending",
    },
    {
      id: "offer-s-2",
      toUser: "Windslicer",
      itemType: "Material",
      name: "Storm Crystal",
      rarity: "Epic",
      price: 8,
      currency: "GALA",
      img: "/images/items/storm_crystal.png",
      status: "Rejected",
    },
  ],
};

/* -------------------------------------------------------
   STYLES
------------------------------------------------------- */
const rarityColors = {
  Common: "text-gray-300",
  Rare: "text-sky-300",
  Epic: "text-purple-300",
  Legendary: "text-amber-300",
};

const rarityBorders = {
  Common: "border-white/10",
  Rare: "border-sky-300/40",
  Epic: "border-purple-300/40",
  Legendary: "border-amber-300/50",
};

/* -------------------------------------------------------
   MAIN PANEL
------------------------------------------------------- */
export default function ListingsPanel() {
  const [tab, setTab] = useState("Active");
  const [offersTab, setOffersTab] = useState("Received");
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);

  /* LISTINGS FILTERING */
  const listings = useMemo(() => {
    if (tab === "Offers") return [];

    const key =
      tab === "Active" ? "active" : tab === "Sold" ? "sold" : "expired";

    return dummyListings[key].filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search]);

  /* OFFERS FILTERING */
  const offers = useMemo(() => {
    if (tab !== "Offers") return [];

    const key = offersTab === "Received" ? "received" : "sent";

    return dummyOffers[key].filter((o) =>
      o.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, offersTab, search]);

  const totalRevenue = dummyListings.sold.reduce(
    (sum, i) => sum + i.price,
    0
  );

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2">
        My Listings
      </h2>
      <p className="text-xs md:text-sm text-gray-400 mb-4">
        Manage your active listings, sales history and offers.
      </p>

      {/* MAIN TABS */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {["Active", "Sold", "Expired", "Offers"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              px-3 py-1.5 rounded-xl text-sm whitespace-nowrap
              ${
                tab === t
                  ? "bg-purple-600/50 border border-purple-400/50 text-white"
                  : "bg-black/50 border border-white/10 text-gray-300 hover:bg-white/5"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          🔍
        </span>
        <input
          placeholder={
            tab === "Offers" ? "Search offers..." : "Search listings..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full rounded-xl bg-black/60 border border-white/15
            pl-10 pr-3 py-2 text-sm text-gray-100
            placeholder:text-gray-500
            focus:border-purple-400 focus:outline-none
          "
        />
      </div>

      {/* Revenue summary (ONLY Sold tab) */}
      {tab === "Sold" && (
        <div className="rounded-2xl bg-black/60 border border-white/10 p-4 mb-6">
          <p className="text-xs text-gray-400">Total Revenue</p>
          <p className="text-xl font-semibold text-purple-300">
            {totalRevenue} ARCANO
          </p>
        </div>
      )}

      {/* OFFERS SUB-TABS */}
      {tab === "Offers" && (
        <div className="flex gap-2 mb-4">
          {["Received", "Sent"].map((t) => (
            <button
              key={t}
              onClick={() => setOffersTab(t)}
              className={`
                px-3 py-1.5 text-sm rounded-xl
                ${
                  offersTab === t
                    ? "bg-purple-600/50 border border-purple-400/50 text-white"
                    : "bg-black/50 border border-white/10 text-gray-300"
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* LISTINGS GRID */}
      {tab !== "Offers" && (
        <>
          {listings.length === 0 ? (
            <div className="text-sm text-gray-400">
              No {tab.toLowerCase()} listings found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {listings.map((list) => (
                <ListingCard
                  key={list.id}
                  data={list}
                  tab={tab}
                  onClick={() => setSelectedListing(list)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* OFFERS GRID */}
      {tab === "Offers" && (
        <>
          {offers.length === 0 ? (
            <div className="text-sm text-gray-400">No offers found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} tab={offersTab} />
              ))}
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          tab={tab}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  );
}

/* -------------------------------------------------------
   LISTING CARD
------------------------------------------------------- */
function ListingCard({ data, tab, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group rounded-2xl bg-black/70 border p-4 text-left
        hover:brightness-110 transition
        ${rarityBorders[data.rarity]}
      `}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={data.img}
            alt=""
            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{data.name}</p>

          <p className={`text-xs ${rarityColors[data.rarity]} mt-1`}>
            {data.rarity} {data.type}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            {tab === "Active" && (
              <>
                {data.price} {data.currency}
                <br />
                <span className="text-[0.7rem] text-gray-500">
                  {data.views} views • {data.favorites} favorites
                </span>
              </>
            )}

            {tab === "Sold" && (
              <span className="text-gray-300">
                Sold for {data.price} {data.currency}
              </span>
            )}

            {tab === "Expired" && (
              <span className="text-gray-300">
                Expired · {data.price} {data.currency}
              </span>
            )}
          </p>
        </div>
      </div>
    </button>
  );
}

/* -------------------------------------------------------
   OFFER CARD
------------------------------------------------------- */
function OfferCard({ offer, tab }) {
  return (
    <div
      className={`
        rounded-2xl bg-black/70 border p-4 
        hover:brightness-110 transition
        ${rarityBorders[offer.rarity]}
      `}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16">
          <img src={offer.img} className="w-full h-full object-contain" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{offer.name}</p>

          <p className={`text-xs ${rarityColors[offer.rarity]} mt-1`}>
            {offer.rarity} {offer.itemType}
          </p>

          <p className="text-xs text-gray-300 mt-2">
            {offer.price} {offer.currency}
          </p>

          {tab === "Received" && (
            <>
              <p className="text-[0.7rem] text-gray-400 mt-1">
                From: {offer.fromUser}
              </p>
              <p className="text-[0.7rem] text-gray-500">
                Expires: {offer.expiresIn}
              </p>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 rounded-xl bg-purple-600/60 border border-purple-400 text-white text-xs">
                  Accept
                </button>
                <button className="flex-1 py-1.5 rounded-xl bg-red-600/40 border border-red-400/40 text-red-300 text-xs">
                  Reject
                </button>
              </div>
            </>
          )}

          {tab === "Sent" && (
            <>
              <p className="text-[0.7rem] text-gray-400 mt-1">
                To: {offer.toUser}
              </p>
              <p className="text-[0.7rem] text-gray-500">
                Status: {offer.status}
              </p>

              <button className="mt-3 w-full py-1.5 rounded-xl bg-black/40 border border-white/10 text-gray-300 text-xs">
                Cancel Offer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   LISTING MODAL
------------------------------------------------------- */
function ListingModal({ listing, tab, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-4">
      <div className="relative bg-black/80 border border-white/15 rounded-3xl max-w-md w-full p-6">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16">
            <img src={listing.img} className="w-full h-full object-contain" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">{listing.name}</h3>
            <p className="text-sm text-gray-400">{listing.rarity}</p>
            <p className="text-xs text-gray-300 mt-0.5">
              {listing.type} • {listing.currency}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="text-sm text-gray-300 mb-4">
          {tab === "Active" && (
            <>
              <p>
                Price: {listing.price} {listing.currency}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {listing.views} views • {listing.favorites} favorites
              </p>
            </>
          )}

          {tab === "Sold" && (
            <>
              <p>
                Sold for {listing.price} {listing.currency}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sold on {listing.soldAt}
              </p>
            </>
          )}

          {tab === "Expired" && (
            <>
              <p>Expired listing</p>
              <p className="text-xs text-gray-500 mt-1">
                Expired on {listing.expiredAt}
              </p>
            </>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2">
          {tab === "Active" && (
            <>
              <button className="py-2 rounded-xl bg-purple-600/60 border border-purple-400 text-white font-semibold">
                Edit Price
              </button>
              <button className="py-2 rounded-xl bg-red-600/40 border border-red-400/40 text-red-300">
                Cancel Listing
              </button>
            </>
          )}

          {tab === "Expired" && (
            <button className="py-2 rounded-xl bg-purple-600/60 border border-purple-400 text-white font-semibold">
              Relist Item
            </button>
          )}

          <button
            onClick={onClose}
            className="py-2 rounded-xl bg-black/40 border border-white/10 text-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
