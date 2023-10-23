const ownersClubs = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Land Owners Club",
    value: "land_owners_club",
  },

  {
    name: "Home Owners Club",
    value: "home_owners_club",
  },

  {
    name: "Office Owners Club",
    value: "office_owners_club",
  },
];

function ClubOwnersFilter({ ownersClub, setOwnerFilter, renderChild }) {
  return (
    <div className="flex  flex-no-wrap space-x-4 items-center scrollbar-fix text-center filter-container  overflow-x-auto pb-2 no-scrollbar max-w-[99%]">
      {ownersClubs.map((club) => {
        if (renderChild) {
          return renderChild(
            club,
            ownersClub === club.value,
            setOwnerFilter(club.value)
          );
        }

        return (
          <button
            key={club.value}
            onClick={setOwnerFilter(club.value)}
            className={`filter-btn ${
              ownersClub === club.value ? " filter-btn-active" : ""
            }`}
          >
            {club.name}
          </button>
        );
      })}
    </div>
  );
}

export default ClubOwnersFilter;
