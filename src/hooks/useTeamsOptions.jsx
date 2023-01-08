function useTeamsOptions(teams) {
    return teams.map((team) =>({
        id:team.id,
        name:team.name,
    }));
}

export default useTeamsOptions;