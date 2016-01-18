const quotes = [
  {
    "author": "Polish Proverb",
    "text": "When opportunity knocks, some people are in the backyard looking for four-leaf clovers.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "John Wilmot (Earl of Rochester)",
    "text": "Before I got married I had six theories about bringing up children; now I have six children and no theories.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Oscar Wilde",
    "text": "Always borrow money from a pessimist. He won't expect it back.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/oscar-wilde-300x300.jpg"
  },
  {
    "author": "Douglas Adams",
    "text": "I love deadlines. I love the whooshing noise they make as they go by.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/douglas-adams-300x300.jpg"
  },
  {
    "author": "Flip Wilson",
    "text": "If you think nobody cares if you're alive, try missing a couple of car payments.",
    "image-src": "http: //img.quotery.com/pictures/2013/08/flip-wilson-300x300.jpg"
  },
  {
    "author": "David Brenner",
    "text": "Misers aren't fun to live with, but they make wonderful ancestors.",
    "image-src": "http: //img.quotery.com/pictures/2013/07/david-brenner-300x300.jpg"
  },
  {
    "author": "Dave Barry",
    "text": "My therapist told me the way to achieve true inner peace is to finish what I start. So far I've finished two bags of M&Ms and a chocolate cake. I feel better already.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/dave-barry-300x300.jpg"
  },
  {
    "author": "Robert Frost",
    "text": "By working faithfully eight hours a day you may eventually get to be boss and work twelve hours a day.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/robert-frost-300x300.jpg"
  },
  {
    "author": "Patrick Murray",
    "text": "I've had bad luck with both my wives. The first one left me and the second one didn't.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Franklin Jones",
    "text": "A bargain is something you don't need at a price you can't resist.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Lana Turner",
    "text": "A successful man is one who makes more money than his wife can spend. A successful woman is one who can find such a man.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/lana-turner-300x300.jpg"
  },
  {
    "author": "Isaac Asimov",
    "text": "Those people who think they know everything are a great annoyance to those of us who do.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/isaac-asimov-300x300.jpg"
  },
  {
    "author": "Caroline Rhea",
    "text": "My favorite machine at the gym is the vending machine.",
    "image-src": "http: //img.quotery.com/pictures/2014/04/caroline-rhea-300x300.jpg"
  },
  {
    "author": "Oscar Wilde",
    "text": "Some cause happiness wherever they go; others, whenever they go.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/oscar-wilde-300x300.jpg"
  },
  {
    "author": "George Miller",
    "text": "The trouble with eating Italian food is that five or six days later, you're hungry again.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "George Burns",
    "text": "You know you're getting old when you stoop to tie your shoelaces and wonder what else you could do while you're down there.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/george-burns-300x300.jpg"
  },
  {
    "author": "Bill McGlashen",
    "text": "Patience is something you admire in the driver behind you, but not in one ahead.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Erma Bombeck",
    "text": "The odds of going to the store for a loaf of bread and coming out with only a loaf of bread are three billion to one.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/erma-bombeck-300x300.jpg"
  },
  {
    "author": "Bill Vaughan",
    "text": "We hope that, when the insects take over the world, they will remember with gratitude how we took them along on all our picnics.",
    "image-src": "http: //img.quotery.com/pictures/2013/06/bill-vaughan-300x300.jpg"
  },
  {
    "author": "Muhammad Ali",
    "text": "If you even dream of beating me you'd better wake up and apologize.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/muhammad-ali-300x300.jpg"
  },
  {
    "author": "Jerry Seinfeld",
    "text": "According to most studies, people's number one fear is public speaking. Number two is death. Death is number two! Does that sound right? That means to the average person, if you go to a funeral, you're better off in the casket than doing the eulogy.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/jerry-seinfeld-300x300.jpg"
  },
  {
    "author": "Caskie Stinnett",
    "text": "A diplomat is someone who can tell you to go to hell in such a way that you will look forward to the trip.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Joan Rivers",
    "text": "I hate housework! You make the beds, you do the dishes'and six months later you have to start all over again.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Greg King",
    "text": "Do not argue with an idiot. He will drag you down to his level and beat you with experience.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Anonymous",
    "text": "Why didn't Noah swat those two mosquitoes?",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Jerry Seinfeld",
    "text": "People who read the tabloids deserve to be lied to.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/jerry-seinfeld-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Money can't buy happiness, but it sure makes misery easier to live with.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "The best way to lie is to tell the truth . . . carefully edited truth.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Charles Lamb",
    "text": "I always arrive late at the office, but I make up for it by leaving early.",
    "image-src": "http: //img.quotery.com/pictures/2013/06/charles-lamb-300x300.jpg"
  },
  {
    "author": "Evan Esar",
    "text": "The best time to give advice to your children is while they're still young enough to believe you know what you're talking about.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Robert Bloch",
    "text": "Friendship is like peeing on yourself:  everyone can see it, but only you get the warm feeling that it brings.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/robert-bloch-300x300.jpg"
  },
  {
    "author": "Jack Nicholson",
    "text": "My mother never saw the irony in calling me a son-of-a-bitch.",
    "image-src": "http: //img.quotery.com/pictures/2014/01/jack-nicholson-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Dogs have masters. Cats have staff.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Rodney Dangerfield",
    "text": "I was such an ugly kid. When I played in the sandbox the cat kept trying to cover me up.",
    "image-src": "http: //img.quotery.com/pictures/2013/08/rodney-dangerfield-300x300.jpg"
  },
  {
    "author": "Ben Bergor",
    "text": "It is amazing how quickly the kids learn to drive a car, yet are unable to understand the lawn mower, snowblower and vacuum cleaner.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Anonymous",
    "text": "America is a country where half the money is spent buying food, and the other half is spent trying to lose weight.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Claude Pepper",
    "text": "A stockbroker urged me to buy a stock that would triple its value every year. I told him, 'At my age, I don't even buy green bananas.'",
    "image-src": "http: //img.quotery.com/pictures/2013/10/claude-pepper-300x300.jpg"
  },
  {
    "author": "Harry S. Truman",
    "text": "You want a friend in Washington? Get a dog.",
    "image-src": "http: //img.quotery.com/pictures/2014/05/harry-s-truman-300x300.jpg"
  },
  {
    "author": "Franklin P. Jones",
    "text": "The trouble with being punctual is that nobody's there to appreciate it.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Jos̩ Maria de E̤a de Queiroz",
    "text": "Politicians and diapers have one thing in common. They should both be changed regularly, and for the same reason.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/jos%C3%A9-maria-de-e%C3%A7a-de-queiroz-300x300.jpg"
  },
  {
    "author": "Albert Einstein",
    "text": "Two things are infinite, the universe and human stupidity, and I am not yet completely sure about the universe.",
    "image-src": "http: //img.quotery.com/pictures/2013/02/albert-einstein-300x300.jpg"
  },
  {
    "author": "Ann Landers",
    "text": "At every party, there are two kinds of people'those who want to go home and those who don't. The trouble is, they are usually married to each other.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/ann-landers-300x300.jpg"
  },
  {
    "author": "Agatha Christie",
    "text": "An archaeologist is the best husband a woman can have; the older she gets the more interested he is in her.",
    "image-src": "http: //img.quotery.com/pictures/2013/02/agatha-christie-300x300.jpg"
  },
  {
    "author": "Sam Levenson",
    "text": "Insanity is hereditary. You get it from your children.",
    "image-src": "http: //img.quotery.com/pictures/2013/07/sam-levenson-300x300.jpg"
  },
  {
    "author": "Robert Wilensky",
    "text": "We've all heard that a million monkeys banging on a million typewriters will eventually reproduce the entire works of Shakespeare. Now, thanks to the Internet, we know this is not true.",
    "image-src": "http: //img.quotery.com/pictures/2014/04/robert-wilensky-300x300.jpg"
  },
  {
    "author": "T. H. Thompson",
    "text": "A filing cabinet is a place where you can lose things systematically.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Mark Twain",
    "text": "There is nothing so annoying as to have two people go right on talking when you're interrupting.",
    "image-src": "http: //img.quotery.com/pictures/2013/02/mark-twain-300x300.jpg"
  },
  {
    "author": "Dave Barry",
    "text": "Never, under any circumstances, take a sleeping pill and a laxative on the same night.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/dave-barry-300x300.jpg"
  },
  {
    "author": "Rodney Dangerfield",
    "text": "I told my wife the truth. I told her I was seeing a psychiatrist. Then she told me the truth:  that she was seeing a psychiatrist, two plumbers, and a bartender.",
    "image-src": "http: //img.quotery.com/pictures/2013/08/rodney-dangerfield-300x300.jpg"
  },
  {
    "author": "Phyllis Diller",
    "text": "Housework can't kill you, but why take a chance?",
    "image-src": "http: //img.quotery.com/pictures/2013/06/phyllis-diller-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Nothing sucks more than that moment during an argument when you realize you're wrong.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Steven Wright",
    "text": "I intend to live forever. So far, so good.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/steven-wright-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "How do you get a sweet little 80-year-old lady to say the F word? Get another sweet little 80-year-old lady to yell 'BINGO!'",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Doug Larson",
    "text": "Life expectancy would grow by leaps and bounds if green vegetables smelled as good as bacon.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Bob Thaves",
    "text": "Inside me there's a thin person struggling to get out, but I can usually sedate him with four or five cupcakes.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Anonymous",
    "text": "When tempted to fight fire with fire, remember that the Fire Department usually uses water.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Elayne Boosler",
    "text": "I have six locks on my door all in a row. When I go out, I lock every other one. I figure no matter how long somebody stands there picking the locks, they are always locking three.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/elayne-boosler-300x300.jpg"
  },
  {
    "author": "Emo Philips",
    "text": "I asked God for a bike, but I know God doesn't work that way. So I stole a bike and asked for forgiveness.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/emo-philips-300x300.jpg"
  },
  {
    "author": "Henny Youngman",
    "text": "If at first you don't succeed . . . so much for skydiving.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/henny-youngman-300x300.jpg"
  },
  {
    "author": "Rodney Dangerfield",
    "text": "Bisexuality immediately doubles your chances for a date on Saturday night.",
    "image-src": "http: //img.quotery.com/pictures/2013/08/rodney-dangerfield-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Tell a man there are 300 billion stars in the universe and he'll believe you. Tell him a bench has wet paint on it and he'll have to touch it to be sure.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "I have to exercise early in the morning before my brain figures out what I'm doing.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Wendy Liebman",
    "text": "My husband wanted one of those big-screen TVs for his birthday. So I just moved his chair closer to the one we have already.",
    "image-src": "http: //img.quotery.com/pictures/2013/07/wendy-liebman-300x300.jpg"
  },
  {
    "author": "Bob Hope",
    "text": "A bank is a place that will lend you money, if you can prove that you don't need it.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/bob-hope-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Why do people say 'no offense' right before they're about to offend you?",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Men have only two emotions:  hungry and horny. If you see him without an erection, make him a sandwich.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Wilson Mizner",
    "text": "If you steal from one author, it's plagiarism; if you steal from many, it's research.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/wilson-mizner-300x300.jpg"
  },
  {
    "author": "Mark Russell",
    "text": "The scientific theory I like best is that the rings of Saturn are composed entirely of lost airline luggage.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/mark-russell-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "I dream of a better tomorrow, where chickens can cross the road and not be questioned about their motives.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Children:  You spend the first 2 years of their life teaching them to walk and talk. Then you spend the next 16 telling them to sit down and shut-up.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "I read recipes the same way I read science fiction. I get to the end and I think, 'Well, that's not going to happen.'",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Billy Sunday",
    "text": "Going to church doesn't make you a Christian any more than standing in a garage makes you a car.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/billy-sunday-300x300.jpg"
  },
  {
    "author": "Steven Wright",
    "text": "I couldn't repair your brakes, so I made your horn louder.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/steven-wright-300x300.jpg"
  },
  {
    "author": "George Burns",
    "text": "Retirement at 65 is ridiculous. When I was 65 I still had pimples.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/george-burns-300x300.jpg"
  },
  {
    "author": "Steve Martin",
    "text": "First the doctor told me the good news:  I was going to have a disease named after me.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/steve-martin-300x300.jpg"
  },
  {
    "author": "Ronald Reagan",
    "text": "It's true hard work never killed anybody, but I figure, why take the chance?",
    "image-src": "http: //img.quotery.com/pictures/2013/09/ronald-reagan-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "If you do a job too well, you'll get stuck with it.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Charles Wadsworth",
    "text": "By the time a man realizes that his father was right, he has a son who thinks he's wrong.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Socrates",
    "text": "By all means, marry. If you get a good wife, you'll become happy; if you get a bad one, you'll become a philosopher.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/socrates-300x300.jpg"
  },
  {
    "author": "Ethel Mumford",
    "text": "God gave us our relatives; thank God we can choose our friends.",
    "image-src": "http: //www.quotery.com/wp-content/themes/quotery/images/xphoto-unavailable.jpg.pagespeed.ic.-Us4F3NMM8.webp"
  },
  {
    "author": "Anonymous",
    "text": "How is it one careless match can start a forest fire, but it takes a whole box to start a campfire?",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Marilyn Monroe",
    "text": "Women who seek to be equal with men lack ambition.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/marilyn-monroe-300x300.jpg"
  },
  {
    "author": "Ogden Nash",
    "text": "To keep your marriage brimming, with love in the loving cup, whenever you're wrong admit it; whenever you're right shut up.",
    "image-src": "http: //img.quotery.com/pictures/2014/04/ogden-nash-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "The shinbone is a device for finding furniture in a dark room.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Milton Berle",
    "text": "If evolution really works, how come mothers only have two hands?",
    "image-src": "http: //img.quotery.com/pictures/2013/03/milton-berle-300x300.jpg"
  },
  {
    "author": "Dorothy Parker",
    "text": "The best way to keep children home is to make the home a pleasant atmosphere . . . and let the air out of the tires.",
    "image-src": "http: //img.quotery.com/pictures/2014/01/dorothy-parker-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "Evening news is where they begin with 'Good evening,' and then proceed to tell you why it isn't.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Will Rogers",
    "text": "All you need to grow fine, vigorous grass is a crack in your sidewalk.",
    "image-src": "http: //img.quotery.com/pictures/2013/03/will-rogers-300x300.jpg"
  },
  {
    "author": "Bob Monkhouse",
    "text": "When I die, I want to go peacefully like my grandfather did'in his sleep. Not yelling and screaming like the passengers in his car.",
    "image-src": "http: //img.quotery.com/pictures/2013/11/bob-monkhouse-300x300.jpg"
  },
  {
    "author": "George Jessel",
    "text": "The human brain is a wonderful thing. It starts working the moment you are born, and never stops until you stand up to speak in public.",
    "image-src": "http: //img.quotery.com/pictures/2014/04/george-jessel-300x300.jpg"
  },
  {
    "author": "Al McGuire",
    "text": "The only mystery in life is why the kamikaze pilots wore helmets.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/al-mcguire-300x300.jpg"
  },
  {
    "author": "Ronald Reagan",
    "text": "Politics is supposed to be the second oldest profession. I have come to realize that it bears a very close resemblance to the first.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/ronald-reagan-300x300.jpg"
  },
  {
    "author": "Norm Crosby",
    "text": "When you go into court you are putting your fate into the hands of twelve people who weren't smart enough to get out of jury duty.",
    "image-src": "http: //img.quotery.com/pictures/2014/04/norm-crosby-300x300.jpg"
  },
  {
    "author": "Anonymous",
    "text": "To err is human, to blame it on somebody else shows management potential.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/Anonymous-300x300.jpg"
  },
  {
    "author": "Rita Rudner",
    "text": "To attract men, I wear a perfume called New Car Interior.",
    "image-src": "http: //img.quotery.com/pictures/2013/08/rita-rudner-300x300.jpg"
  },
  {
    "author": "Miles Kington",
    "text": "Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad.",
    "image-src": "http: //img.quotery.com/pictures/2013/10/miles-kington-300x300.jpg"
  },
  {
    "author": "Rod Stewart",
    "text": "Instead of getting married again, I'm going to find a woman I don't like and just give her a house.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/rod-stewart-300x300.jpg"
  },
  {
    "author": "Bob Hope",
    "text": "I grew up with six brothers. That's how I learned to dance waiting for the bathroom.",
    "image-src": "http: //img.quotery.com/pictures/2013/09/bob-hope-300x300.jpg"
  }
]
export default quotes