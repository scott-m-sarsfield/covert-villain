module.exports = {
  phases: {
    LOBBY: 'lobby',
    PRESIDENT_CHOOSES_CHANCELLOR: 'president_chooses_chancellor',
    ELECTION: 'election',
    PRESIDENT_CHOOSES_POLICIES: 'president_chooses_policies',
    CHANCELLOR_CHOOSES_POLICY: 'chancellor_chooses_policy',
    SPECIAL_ACTION_POLICY_PEEK: 'special_action_policy_peek',
    SPECIAL_ACTION_EXECUTION: 'special_action_execution',
    PRESIDENT_APPROVES_VETO: 'president_approves_veto',
    GAME_OVER: 'game_over'
  },
  notifications: {
    PARTY_ASSIGNMENT: 'party_assignment',
    POLICY_ENACTED: 'policy_enacted',
    ELECTION_RESULTS: 'election_results',
    EXECUTION: 'execution',
    VETO: 'veto'
  },
  parties: {
    LIBERAL: 'liberal',
    FASCIST: 'fascist'
  },
  roles: {
    LIBERAL: 'liberal',
    FASCIST: 'fascist',
    MUSSOLINI: 'mussolini'
  },
  presidentialPowers: {
    INVESTIGATE_LOYALTY: 'investigate_loyalty',
    SPECIAL_ELECTION: 'special_election',
    POLICY_PEEK: 'policy_peek',
    EXECUTION: 'execution'
  }
};
