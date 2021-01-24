module.exports = {
  phases: {
    LOBBY: 'lobby',
    PRESS_THE_BUTTON: 'press_the_button', // fake phase - delete
    PRESIDENT_CHOOSES_CHANCELLOR: 'president_chooses_chancellor',
    ELECTION: 'election',
    PRESIDENT_CHOOSES_POLICIES: 'president_chooses_policies',
    CHANCELLOR_CHOOSES_POLICY: 'chancellor_chooses_policy',
    SPECIAL_ACTION_POLICY_PEEK: 'special_action_policy_peek',
    SPECIAL_ACTION_EXECUTION: 'special_action_execution',
    GAME_OVER: 'game_over'
  },
  notifications: {
    PARTY_ASSIGNMENT: 'party_assignment',
    POLICY_ENACTED: 'policy_enacted',
    COUNTRY_IN_CHAOS: 'country_in_chaos',
    EXECUTION: 'execution'
  },
  parties: {
    LIBERAL: 'liberal',
    FASCIST: 'fascist'
  },
  roles: {
    LIBERAL: 'liberal',
    FASCIST: 'fascist',
    MUSSOLINI: 'mussolini'
  }
};
