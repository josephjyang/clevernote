'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Notes', [
    {
      name: 'Teapot',
      content: "I finally got Pam for Secret Santa, so I think I'll get her a teapot filled with some things I think she'll really appreciate. I know she likes listening to my music so I'll make her a mixtape. She also loved my high school yearbook photo, so I'll throw that in there. A Boggle timer because that one time we played Pam only won because she kept writing after time was up. A couple hot sauce packets for that time Pam thought it was ketchup. The mini golf pencil she threw at me after she lost. And finally, a card, because Christmas is the time to tell people how you really feel, right?",
      userId: 1,
      notebookId: 1,
      createdAt: new Date('December 6, 2005 13:24:20'),
      updatedAt: new Date('December 6, 2005 13:24:20')
    },
    {
      name: 'Video Montage',
      content: "Pam seems worried about our marriage and guilty about me leaving Athlead for her, so I'll show her how much she means to me. I'm going to ask the documentary crew if they can help me put together a video to show her how much I love her and that she's always going to be enough for me no matter what happens.",
      userId: 1,
      notebookId: 1,
      createdAt: new Date('May 9, 2013 10:43:32'),
      updatedAt: new Date('May 9, 2013 10:43:32')
    },
     {
       name: 'Stapler in Jello',
       content: "I think it'd be pretty funny if I stuck Dwight's stapler in a big piece of jello. He's been annoying me quite a bit recently and I'm sure this would make him upset.",
       userId: 1,
       notebookId: 2,
       createdAt: new Date('March 24, 2005 10:04:23'),
       updatedAt: new Date('March 24, 2005 10:04:23')
     },
     {
       name: 'Asian Me',
       content: "I have to go to the dentist next week, so what if I asked my friend Steve to pretend to be me? He's an actor and I think it'd be pretty funny. I can give him my passwords and fill him in on any recent sales I made, and he can even take some family photos with Pam and his children. Dwight will be so confused HAH.",
       userId: 1,
       notebookId: 2,
       createdAt: new Date('September 27, 2012 08:09:27'),
       updatedAt: new Date('October 1, 2012 08:09:27')
     },
     {
       name: 'Bad Tips for Flirting with Pam',
       content: "I know Andy thinks Pam is pretty, but the thought of them together disgusts me. Maybe I can give Andy some tips that I know will definitely turn Pam off. Now, what are some things that Pam hates? Hmm... I know she hates frisbee, hunting, pig Latin, oh, and she's really creepd out by the old guy in the Six Flags commercial. If I tell Andy to talk to Pam about these things I know it'll go terribly.",
       userId: 1,
       notebookId: 3,
       createdAt: new Date('November 30, 2006 11:06:52'),
       updatedAt: new Date('November 30, 2006 11:06:52')
     },
     {
       name: "Hiding Andy's phone",
       content: "Andy's been annoying me lately, with his over-the-top efforts to try to get people to like him. What can I do to mess with him? Oh, I know. His cell phone always plays that annoying song. I just have to find a way to get it, and then I'll hide it somewhere... In my desk? No, what about the ceiling? That might be good. We can call it and he'll have no idea where it's coming from. That ought to set him straight.",
       userId: 1,
       notebookId: 3,
       createdAt: new Date('January 18, 2007 10:16:47'),
       updatedAt: new Date('January 18, 2007 10:16:47')
     },
     {
       name: "Updog",
       content: `I'll tell Michael it smells like updog in here. Then he'll say, "What's updog?" Then I'll say, "Not much, what's up with you?" I'm sure he'll get a big kick out of it.`,
       userId: 1,
       notebookId: 4,
       createdAt: new Date('January 18, 2007 10:16:47'),
       updatedAt: new Date('January 18, 2007 10:16:47')
     },
     {
       name: "Half Day",
       content: `It looks like Michael just passed out after eating a whole chicken pot pie by himself. I bet if we change the clocks and his watch we can wake him up and go home early and he'll never even notice.`,
       userId: 1,
       notebookId: 4,
       createdAt: new Date('May 14, 2009 13:19:21'),
       updatedAt: new Date('May 14, 2009 13:19:21')
     },
     {
       name: "Pretzel Stand",
       content: "Michael and Stanley love the hot pretzels that come by the office every year. What if I opened up a pretzel stand in the building so that they could have pretzels year round? Hmm... but then I'd have to work with Dwight because he owns the building, so maybe this isn't such a good idea.",
       userId: 1,
       notebookId: 5,
       createdAt: new Date('October 19, 2006 16:11:25'),
       updatedAt: new Date('October 19, 2006 16:11:25')
     },
     {
       name: "Athlead",
       content: "I've always wanted to work with athletes, so what if I created a sports marketing agency? We could work with some of the top athletes around the country and help them land marketing deals with other companies. I know some of my college friends would like to start something like this with me. I think I can get Darryl onboard too.",
       userId: 1,
       notebookId: 5,
       createdAt: new Date('September 20, 2012 12:31:35'),
       updatedAt: new Date('September 20, 2012 12:31:35')
     }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Notes', null, {});
  }
};
