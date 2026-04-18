const STORAGE_KEYS = {
  users: "eptivo_users",
  session: "eptivo_session",
};

/** Older builds used a different `localStorage` key prefix; migrate once so users keep accounts. */
const LEGACY_KEY_PREFIX = "\u0065\u0070\u0074\u0069\u0063\u006f";
const LEGACY_STORAGE_KEYS = {
  users: `${LEGACY_KEY_PREFIX}_users`,
  session: `${LEGACY_KEY_PREFIX}_session`,
};

(function migrateLegacyStorageKeys() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.users) && localStorage.getItem(LEGACY_STORAGE_KEYS.users)) {
      localStorage.setItem(STORAGE_KEYS.users, localStorage.getItem(LEGACY_STORAGE_KEYS.users));
    }
    if (!localStorage.getItem(STORAGE_KEYS.session) && localStorage.getItem(LEGACY_STORAGE_KEYS.session)) {
      localStorage.setItem(STORAGE_KEYS.session, localStorage.getItem(LEGACY_STORAGE_KEYS.session));
    }
  } catch {
    /* ignore quota / private mode */
  }
})();

const APP_PAGES = [
  "chat-page",
  "niches-page",
  "saved-page",
  "preferences-page",
  "feedback-page",
  "profile-page",
];

/** First screen after login when there is no hash (or an invalid hash). */
const DEFAULT_APP_PAGE = "niches-page";

const MAX_USERS = 3;
const PLATFORM = "Instagram";
// If you want feedback emailed to you via Formspree, create a form at Formspree
// and paste your endpoint URL here (looks like: https://formspree.io/f/xxxxxx).
const FORMSPREE_ENDPOINT = "";
const SEND_FEEDBACK_TO_EMAIL = Boolean(FORMSPREE_ENDPOINT);
const ALLOWED_ROLES = [
  "Creator",
  "Social Media Manager",
  "Small Business Owner",
];

const RULES = {
  Food: {
    Low: [
      "1) 5-Minute Recipe Content | Posting Day: Monday | Hook: Dinner in 5 minutes? Let me prove it. | Elaboration: The creator demonstrates a quick recipe that viewers can easily replicate. The content should show the ingredients, cooking steps, and final result in a short engaging video. This type of content appeals to busy viewers who want quick meal ideas. | Strategy: Use fast cuts and captions to maintain viewer attention.",
      "2) Budget Meal Challenge | Posting Day: Tuesday | Hook: What can $5 buy for dinner? | Elaboration: The creator prepares a meal using a limited budget. This shows creativity while helping viewers discover affordable meal ideas. | Strategy: Display the total cost of ingredients to emphasize affordability.",
      "3) Cooking for Beginners | Posting Day: Wednesday | Hook: If you can’t cook, start with this recipe. | Elaboration: Simple step-by-step cooking instructions targeted at people who are new to cooking. | Strategy: Use clear instructions and avoid complicated techniques.",
      "4) Street Food Exploration | Posting Day: Thursday | Hook: This might be the best street food in the city. | Elaboration: Creators visit street food vendors and showcase unique dishes, highlighting flavors, price, and experience. | Strategy: Capture authentic reactions to the food.",
      "5) Taste Test Content | Posting Day: Friday | Hook: Let’s see if this trending food is actually good. | Elaboration: The creator tries popular or trending foods and gives honest reactions. | Strategy: Encourage viewers to comment if they have tried the food.",
      "6) Healthy Meal Prep | Posting Day: Sunday | Hook: Healthy meals for the entire week. | Elaboration: Creators prepare several meals in advance to save time during the week. | Strategy: Show portioning and storage tips.",
      "7) Cooking Mistakes to Avoid | Posting Day: Monday | Hook: Stop making these cooking mistakes. | Elaboration: Creators highlight common cooking errors and show the correct method. | Strategy: Demonstrate both the mistake and the correct approach.",
      "8) One Ingredient, Three Meals | Posting Day: Tuesday | Hook: One ingredient, three different meals. | Elaboration: Show how a single ingredient can be used to create multiple dishes. | Strategy: Encourage creativity in cooking.",
      "9) Cooking With Followers’ Suggestions | Posting Day: Wednesday | Hook: You asked me to cook this. | Elaboration: The creator prepares a dish requested by followers. | Strategy: Encourages audience interaction.",
      "10) Food Transformation Content | Posting Day: Thursday | Hook: Watch this simple ingredient turn into something amazing. | Elaboration: Show the transformation from raw ingredients to a finished dish. | Strategy: Use satisfying transitions.",
      "11) Cultural Food Series | Posting Day: Friday | Hook: Today we’re cooking a traditional dish from Kenya. | Elaboration: Highlight cultural foods and explain their origins.",
      "12) Cooking With Limited Ingredients | Posting Day: Saturday | Hook: What can you cook with only 3 ingredients? | Elaboration: Show creative cooking with minimal ingredients.",
      "13) Cooking Fail vs Success | Posting Day: Sunday | Hook: This recipe went wrong… then right. | Elaboration: Show mistakes and improvements during cooking.",
      "14) Breakfast Recipe Series | Posting Day: Morning posts | Hook: Quick breakfast ideas before work. | Elaboration: Demonstrate simple breakfast meals.",
      "15) Late Night Snack Ideas | Posting Day: Evening | Hook: Best midnight snacks. | Elaboration: Share simple snack recipes.",
      "16) Cook With Me Content | Posting Day: Sunday | Hook: Come cook dinner with me. | Elaboration: The creator films a relaxed cooking session where viewers follow along while preparing a meal. This style feels personal and helps build a stronger connection with the audience. | Strategy: Use conversational narration to make the video feel interactive.",
      "17) Trending Food Recreation | Posting Day: Friday | Hook: Let’s try making this viral recipe. | Elaboration: Creators recreate trending food recipes from social media platforms and give their own opinion on the results. | Strategy: Mention the trend in the caption to increase discoverability.",
      "18) What I Eat in a Day | Posting Day: Monday | Hook: Everything I ate today. | Elaboration: The creator shares all meals consumed in one day, from breakfast to dinner. This format works well for lifestyle audiences. | Strategy: Keep meals visually appealing to maintain viewer interest.",
      "19) Cooking Hacks | Posting Day: Wednesday | Hook: Kitchen hacks that will save you time. | Elaboration: Creators demonstrate small tricks that make cooking easier or faster. | Strategy: Short, quick tips work well for short-form videos.",
      "20) Mystery Ingredient Challenge | Posting Day: Saturday | Hook: I have to cook using this mystery ingredient. | Elaboration: The creator receives a surprise ingredient and must create a meal using it. | Strategy: Build suspense and reveal the final dish at the end.",
    ],
    Medium: [
      "21) Weekly Menu Highlight | Posting Day: Monday | Hook: This week’s special dishes. | Elaboration: Showcase the most popular meals available that week. | Strategy: Use attractive food visuals to increase appetite appeal.",
      "22) Behind-the-Kitchen Content | Posting Day: Tuesday | Hook: Here’s how your favorite dish is prepared. | Elaboration: Show chefs preparing meals in the kitchen. | Strategy: Authenticity builds trust in the brand.",
      "23) Chef Introduction Content | Posting Day: Wednesday | Hook: Meet the chef behind your favorite meals. | Elaboration: Introduce the people who prepare the food. | Strategy: Humanizing the brand increases customer connection.",
      "24) Food Polls | Posting Day: Thursday | Hook: Which dish should return to the menu? | Elaboration: Ask followers to vote between menu options. | Strategy: Use polls on Instagram stories.",
      "25) Food Photography Showcase | Posting Day: Friday | Hook: This dish deserves your attention. | Elaboration: Share high-quality food images highlighting textures and colors. | Strategy: Use consistent branding style.",
      "26) Customer Reaction Videos | Posting Day: Saturday | Hook: Customer reactions after tasting our signature dish. | Elaboration: Record customers trying the food and reacting. | Strategy: Authentic reactions attract curiosity.",
      "27) Recipe Teasers | Posting Day: Sunday | Hook: Can you guess what we’re cooking? | Elaboration: Show short previews of recipes before revealing the full dish.",
      "28) Food Trivia Content | Posting Day: Tuesday | Hook: Did you know this dish originated from…? | Elaboration: Share interesting facts about food.",
      "29) Ingredient Spotlight | Posting Day: Wednesday | Hook: The secret ingredient behind our sauce. | Elaboration: Highlight ingredients used in signature dishes.",
      "30) Food Preparation Timelapse | Posting Day: Thursday | Hook: Watch this dish come together in 30 seconds. | Elaboration: Show the entire cooking process quickly.",
      "31) Food Pairing Ideas | Posting Day: Friday | Hook: The perfect drink to pair with this meal. | Elaboration: Suggest combinations that enhance flavors.",
      "32) Seasonal Food Content | Posting Day: Beginning of a season | Hook: Our seasonal menu is here. | Elaboration: Introduce dishes inspired by seasonal ingredients.",
      "33) Food Storytelling Post | Posting Day: Sunday | Hook: The story behind this traditional dish. | Elaboration: Explain cultural or historical background.",
      "34) Community Food Event Promotion | Posting Day: Monday | Hook: Join us for our food tasting event. | Elaboration: Promote local events involving the brand.",
      "35) Customer Review Highlights | Posting Day: Wednesday | Hook: Our customers say this is their favorite dish. | Elaboration: Share positive customer feedback.",
    ],
    High: [
      "36) Signature Dish Showcase | Posting Day: Monday | Hook: Our most popular dish. | Elaboration: Highlight the restaurant’s best-selling meal.",
      "37) Daily Special Promotion | Posting Day: Lunch time | Hook: Today’s lunch special. | Elaboration: Promote limited-time menu items.",
      "38) Customer Appreciation Post | Posting Day: Friday | Hook: Thank you for supporting our small business.",
      "39) New Menu Item Launch | Posting Day: Tuesday | Hook: Introducing our newest dish.",
      "40) Cooking Demonstration | Posting Day: Wednesday | Hook: Here’s how we prepare this dish.",
      "41) Food Combo Deals | Posting Day: Thursday | Hook: This combo saves you money.",
      "42) Limited-Time Offer | Posting Day: Weekend | Hook: Weekend food discount.",
      "43) Behind-the-Business Story | Posting Day: Sunday | Hook: The journey of starting our food business.",
      "44) Food Packaging Process | Posting Day: Monday | Hook: Preparing your orders.",
      "45) Kitchen Team Appreciation | Posting Day: Tuesday | Hook: The team behind your meals.",
      "46) Cooking Tips From the Chef | Posting Day: Wednesday | Hook: Chef’s secret cooking tip.",
      "47) Food Preparation ASMR | Posting Day: Thursday | Hook: Listen to the sounds of cooking.",
      "48) Popular Customer Orders | Posting Day: Friday | Hook: Most ordered dishes this week.",
      "49) Food Problem–Solution Content | Posting Day: Saturday | Hook: Don’t feel like cooking tonight? We’ve got you.",
      "50) Future Menu Teaser | Posting Day: Sunday | Hook: Something new is coming to the menu. | Elaboration: Preview upcoming dishes to build excitement.",
    ],
  },
  Fashion: {
    Low: [
      "1) 7 Outfits for 7 Days | Concept: Show a full week of outfits for different moods and activities. | Hook: Stop saying you have nothing to wear… here are 7 outfits from the same closet. | Content Flow: Monday – casual class outfit; Tuesday – sporty look; Wednesday – minimalist outfit; Thursday – trendy fit; Friday – date night outfit; Saturday – errands look; Sunday – relaxed chic. | Strategy: People love weekly inspiration because they can copy the outfits easily.",
      "2) One Item, Five Outfits | Concept: Style one clothing item multiple ways. | Hook: One skirt. Five outfits. Zero excuses. | Content Flow: Casual look; Work look; Date night look; Street style look; Party look. | Strategy: Shows styling creativity, which increases saves and shares.",
      "3) Casual vs Classy | Concept: Same clothing pieces styled two different ways. | Hook: Same outfit… two completely different vibes. | Content Flow: First half: casual version; Transition; Second half: elegant version. | Strategy: Transformation content performs extremely well.",
      "4) Fashion Mistakes You Should Avoid | Concept: Educate followers about common styling mistakes. | Hook: 5 fashion mistakes that instantly ruin your outfit. | Examples: Wrong color combinations; Over-accessorizing; Poor fit; Wrinkled clothes; Ignoring proportions. | Strategy: Educational content builds authority.",
      "5) Wardrobe Essentials Everyone Needs | Concept: Show staple pieces every wardrobe should have. | Hook: If your closet doesn’t have these… we need to talk. | Examples: White shirt; Black dress; Neutral blazer; Denim jeans; Basic sneakers.",
      "6) Outfit from Thrift Store Pieces | Concept: Style outfits using affordable thrift items. | Hook: This entire outfit cost less than lunch. | Strategy: Budget fashion content attracts mass audiences.",
      "7) Styling One Color | Concept: Build an outfit around a single color. | Hook: How to style all black without looking boring. | Examples: All black; All beige; All white; All denim.",
      "8) Trend vs Timeless | Concept: Compare trendy outfits to classic styles. | Hook: Trend today… outdated tomorrow?",
      "9) Outfit Inspired by Pinterest | Concept: Recreate popular Pinterest outfits. | Hook: Pinterest said this outfit would look good… let’s test it.",
      "10) How to Style Oversized Clothes | Concept: Show how oversized clothing can still look stylish. | Tips: Balance proportions; Add structure; Use belts or fitted pieces.",
      "11) Morning Outfit Routine | Concept: Show how you choose outfits every morning. | Hook: My brain every morning deciding what to wear.",
      "12) Outfit Rating Series | Concept: Rate your past outfits honestly. | Hook: Rating my outfits… brutally honest.",
      "13) Fashion Glow-Up | Concept: Show your old style vs your current style. | Hook: My fashion glow up was personal.",
      "14) Fashion Inspired by Celebrities | Concept: Recreate celebrity looks affordably.",
      "15) Outfit for Different Occasions | Concept: One piece styled for multiple events. | Examples: Brunch; Date; Work; Party.",
      "16) Styling Accessories | Concept: Show how accessories transform outfits. | Examples: Sunglasses; Bags; Jewelry; Belts.",
      "17) Outfit Transition Videos | Concept: Switch outfits with transitions. | Hook: Wait for the transformation.",
      "18) Fashion Hacks | Concept: Quick styling hacks. | Examples: Tucking tricks; Layering tricks; Making cheap outfits look expensive.",
      "19) Outfit Based on Mood | Concept: Build outfits based on a mood. | Examples: Confident mood; Chill mood; Boss mood; Lazy mood.",
      "20) Seasonal Fashion | Concept: Seasonal outfit ideas. | Examples: Summer outfits; Fall layering; Winter style tips.",
    ],
    Medium: [
      "21) Fashion Inspired by Movies | Concept: Recreate outfits inspired by films. | Hook: Movie outfit but make it wearable.",
      "22) Outfit Color Combinations | Concept: Teach good color pairings. | Examples: Black + gold; Beige + white; Denim + brown.",
      "23) Mini Capsule Wardrobe | Concept: Show how to create many outfits with few items. | Hook: 10 pieces. 20 outfits.",
      "24) Fashion Confidence Talk | Concept: Discuss confidence in style. | Hook: The best outfit is confidence.",
      "25) Street Style Inspiration | Concept: Film outfits in different city locations.",
      "26) Outfit Challenge | Concept: Challenge format. | Example: Style an outfit in 60 seconds.",
      "27) Fashion Storytime | Concept: Tell a funny or embarrassing fashion story.",
      "28) Outfit Based on Weather | Concept: Outfit ideas for weather. | Examples: Rainy day outfit; Hot weather outfit.",
      "29) Outfit Based on Personality | Concept: Outfit ideas by personality. | Examples: Introvert style; Bold fashion style.",
      "30) Fashion Trends Review | Concept: Discuss new fashion trends.",
      "31) Affordable Fashion Finds | Concept: Show budget items that look expensive.",
      "32) Styling Old Clothes | Concept: Turn old clothes into new outfits.",
      "33) Closet Cleanout | Concept: Show decluttering process.",
      "34) Outfit with One Pair of Shoes | Concept: Style multiple outfits with the same shoes.",
      "35) Fashion Inspiration from Nature | Concept: Color palettes and outfits inspired by nature.",
    ],
    High: [
      "36) Fashion Do's and Don'ts | Concept: Explain good and bad styling choices.",
      "37) Day-to-Night Outfit | Concept: Transform daytime outfit into night look.",
      "38) Styling Denim | Concept: Different ways to wear denim.",
      "39) Outfit Recreation | Concept: Recreate viral outfits.",
      "40) Fashion Quiz | Concept: Ask followers to choose between outfits.",
      "41) Fashion Moodboard | Concept: Create visual inspiration boards.",
      "42) Styling Basics | Concept: Teach beginners how to build outfits.",
      "43) Outfit Reaction | Concept: React to fashion trends.",
      "44) Packing Outfits | Concept: Show outfits for trips.",
      "45) Fashion Predictions | Concept: Predict upcoming trends.",
      "46) Outfit Based on Music | Concept: Style outfits inspired by songs.",
      "47) Fashion Evolution | Concept: Show fashion through the years.",
      "48) Outfit Inspired by Colors | Concept: Color-themed outfit (example: red themed outfit).",
      "49) Fashion Confidence Tips | Concept: Discuss body positivity and self-expression.",
      "50) Signature Style | Concept: Explain how to create a personal style. | Hook: Your style should speak before you do.",
    ],
  },
  Lifestyle: {
    Low: [
      "A Realistic Day in My Life | Monday 7:30 PM | Hook: Spend a realistic day in my life with me. | Flow: Wake up, breakfast, study/work, gym/walk, evening wind-down | Strategy: Use quick 1-2 second clips and calming music for authentic connection.",
      "My Morning Routine | Tuesday 7:00 AM | Hook: My morning routine that helps me start the day right. | Flow: Wake up, drink water, skincare, breakfast, planning | Strategy: Productive and aesthetic mornings perform strongly.",
      "My Night Routine | Thursday 9:00 PM | Hook: My relaxing night routine after a long day. | Flow: Shower, skincare, journaling, reading, sleep prep | Strategy: Calming routines drive saves and replays.",
      "What I Do in a Day as a University Student | Wednesday 6:30 PM | Hook: A day in my life as a university student. | Flow: Morning prep, classes, study sessions, social time, evening routine | Strategy: Student audiences connect with realistic study-life content.",
      "Productive Study Day With Me | Monday 6:00 PM | Hook: Study with me for a productive day. | Flow: Study setup, library clips, note-taking, breaks, reflection | Strategy: Use soft background audio and satisfying study visuals.",
      "My Sunday Reset Routine | Sunday 6:00 PM | Hook: My Sunday reset routine to prepare for the week. | Flow: Cleaning room, laundry, grocery shopping, weekly planning | Strategy: Reset videos inspire productivity and organization.",
      "Slow Morning Routine | Saturday 9:00 AM | Hook: A slow morning to recharge. | Flow: Coffee prep, journaling, stretching, breakfast | Strategy: Prioritize peaceful visuals and calm music.",
    ],
    Medium: [
      "After Gym Routine | Friday 7:00 PM | Hook: What I do after the gym. | Flow: Post-workout meal, shower, skincare, relaxation | Strategy: Fitness lifestyle content attracts health-conscious viewers.",
      "Self-Care Night Routine | Sunday 8:30 PM | Hook: My self-care night routine to reset my mind. | Flow: Face mask, tea, journaling, meditation | Strategy: Comfort and calm visuals increase watch time.",
      "Weekend in My Life | Saturday 7:00 PM | Hook: A weekend in my life. | Flow: Morning routine, errands, social time, relaxing evening | Strategy: Casual and relatable weekend content performs well.",
      "5 Habits That Improved My Life | Wednesday 7:00 PM | Hook: 5 habits that improved my life. | Flow: Hydration, journaling, walking, reading, planning | Strategy: Educational lifestyle content drives saves and shares.",
      "How I Plan My Week | Sunday 5:00 PM | Hook: How I plan my week to stay organized. | Flow: Write goals, calendar planning, to-do list | Strategy: Planning tips are highly saveable.",
      "My Study Routine | Tuesday 6:00 PM | Hook: My study routine that keeps me focused. | Flow: Study setup, timer method, breaks | Strategy: Study videos build student community engagement.",
      "What I Do When I Feel Unmotivated | Thursday 8:00 PM | Hook: What I do when I feel unmotivated. | Flow: Walk, shower, music, reset | Strategy: Relatable struggles build emotional connection.",
    ],
    High: [
      "Resetting My Life When It Feels Messy | Sunday 6:30 PM | Hook: Resetting my life when everything feels messy. | Flow: Cleaning, journaling, planning | Strategy: Transformation style videos keep viewers watching.",
      "My Daily Productivity Routine | Monday 7:00 PM | Hook: My daily productivity routine. | Flow: Morning planning, work sessions, breaks | Strategy: Fast cuts maintain attention.",
      "How I Balance School and Life | Wednesday 7:30 PM | Hook: How I balance school, life, and content creation. | Flow: Time-blocking, priorities, rest | Strategy: Helpful for students managing many responsibilities.",
      "3 Small Habits That Changed My Life | Tuesday 6:30 PM | Hook: 3 habits that changed my life. | Flow: Hydration, walking, journaling | Strategy: Short list formats work well in short-form video.",
      "My Goal-Setting Routine | Sunday 5:30 PM | Hook: How I set my goals. | Flow: Write goals, vision board, action steps | Strategy: Motivational content encourages shares.",
      "How I Avoid Procrastination | Monday 6:30 PM | Hook: How I stop procrastinating. | Flow: Timer method, task breakdown, focus environment | Strategy: Practical advice content gets saved often.",
    ],
  },
  "Skincare and Wellness": {
    Low: [
      "1) First Impression Skincare Review | Posting Day: Monday | Hook: First time trying this skincare product… let’s see if it actually works. | Elaboration: Creators record their first reaction when testing a skincare product. The video should begin with showing the packaging and explaining what the product claims to do. The creator then applies the product and describes its texture, scent, and feel on the skin. The content should focus on honest impressions rather than exaggerated claims. | Execution Strategy: Film in natural lighting to clearly show skin texture. Keep the video short and authentic. End by asking viewers if they have tried the product.",
      "2) 7-Day Skincare Challenge | Posting Day: Tuesday | Hook: I used this serum for 7 days… and the results surprised me. | Elaboration: Creators document their skin progress over seven days while using a skincare product. Day one shows the initial skin condition. Short clips are recorded daily to track visible changes such as hydration or reduced redness. On the final day, the creator shares the overall experience and results. | Execution Strategy: Consistency is key. Use the same lighting and camera angle each day so viewers can clearly compare results.",
      "3) Morning Skincare Routine | Posting Day: Wednesday | Hook: My realistic morning skincare routine for healthy skin. | Elaboration: This content demonstrates the creator’s daily skincare routine before starting the day. The video walks viewers through each step, explaining the purpose of each product such as cleansing, moisturizing, and sun protection. The creator can also share tips about why certain products are used in the morning. | Execution Strategy: Film the routine in a calm environment. Use captions to explain each step of the routine.",
      "4) Skincare Myth vs Fact | Posting Day: Thursday | Hook: Three skincare myths that are secretly damaging your skin. | Elaboration: Creators address common misconceptions about skincare. For each myth, the creator explains the incorrect belief and then provides accurate information supported by basic skincare science. This type of content helps educate audiences while positioning the creator as a reliable source of information. | Execution Strategy: Use text overlays showing “Myth” and “Fact” to make the content visually engaging.",
      "5) Ingredient Breakdown Content | Posting Day: Friday | Hook: Let’s talk about what’s actually inside this skincare product. | Elaboration: Creators analyze a product’s ingredient list and explain what each major ingredient does for the skin. For example, vitamin C may brighten skin while hyaluronic acid helps with hydration. The goal is to simplify complex skincare information so followers can understand product benefits. | Execution Strategy: Use graphics or captions to highlight key ingredients.",
      "6) Skincare Routine for Oily Skin | Posting Day: Saturday | Hook: If you have oily skin, this routine might help you. | Elaboration: The creator demonstrates a skincare routine designed for oily skin types. Products that help balance oil production and prevent clogged pores are highlighted. The creator explains why each product is suitable for oily skin. | Execution Strategy: Include tips such as avoiding overly harsh cleansers that may increase oil production.",
      "7) Affordable Skincare Recommendations | Posting Day: Sunday | Hook: Good skincare doesn’t have to be expensive. | Elaboration: Creators introduce affordable skincare products that deliver good results. Each product is briefly explained, including its benefits and how it fits into a skincare routine. This type of content appeals to audiences looking for effective but budget-friendly solutions. | Execution Strategy: Focus on transparency and explain why the products are good value.",
      "8) Before and After Skincare Transformation | Posting Day: Tuesday | Hook: My skin transformation after using this product. | Elaboration: Creators show clear before-and-after results of using a skincare product over time. The content explains the skincare problem being addressed and highlights improvements after consistent use. | Execution Strategy: Use identical lighting and camera angles for accurate comparison.",
      "9) Skincare Product Comparison | Posting Day: Thursday | Hook: Which moisturizer is actually better? | Elaboration: The creator compares two skincare products that serve the same purpose. Differences in texture, ingredients, price, and performance are discussed so viewers can decide which product suits their needs. | Execution Strategy: Use a split-screen comparison to make differences clear.",
      "10) Night Skincare Routine | Posting Day: Sunday Evening | Hook: This night routine helped my skin recover. | Elaboration: The creator demonstrates a nighttime skincare routine focused on cleansing, treatment, and hydration. The explanation emphasizes how nighttime skincare supports skin repair and recovery. | Execution Strategy: Create a relaxing tone that encourages viewers to follow the routine before sleep.",
      "11) Skincare Mistakes to Avoid | Posting Day: Monday | Hook: 5 skincare mistakes that might be ruining your skin. | Elaboration: The creator highlights common mistakes people make in their skincare routines, such as over-exfoliating, skipping sunscreen, or mixing incompatible ingredients. Each mistake is explained along with a recommended correction. | Execution Strategy: Use short demonstrations showing the wrong vs correct approach to make the lesson easier to understand.",
      "12) Weekly Self-Care Routine | Posting Day: Sunday | Hook: My weekly self-care routine for healthy skin and relaxation. | Elaboration: This content combines wellness and skincare. The creator shows a relaxing routine that may include facial masks, hydration habits, and stress-relief activities. The aim is to show skincare as part of overall wellness. | Execution Strategy: Create a calm aesthetic using soft lighting and relaxing background music.",
      "13) Minimalist Skincare Routine | Posting Day: Wednesday | Hook: You only need 3 products for a simple skincare routine. | Elaboration: The creator demonstrates a minimal skincare routine using only essential products such as cleanser, moisturizer, and sunscreen. The focus is on simplicity and effectiveness. | Execution Strategy: Explain why fewer products can sometimes improve skin health.",
      "14) Skincare Routine for Busy People | Posting Day: Friday | Hook: A 2-minute skincare routine for busy mornings. | Elaboration: This content is designed for viewers who do not have time for complex routines. The creator shows quick but effective steps to maintain healthy skin. | Execution Strategy: Use fast transitions and captions to emphasize the quick routine.",
      "15) Honest Product Review | Posting Day: Saturday | Hook: Honest review: is this skincare product actually worth buying? | Elaboration: The creator provides a detailed and balanced review of a skincare product, discussing benefits, possible drawbacks, and who the product is best suited for. | Execution Strategy: Maintain transparency to build credibility with the audience.",
      "16) Monthly Skincare Content Calendar | Posting Day: Monday | Hook: How to plan an entire month of skincare content in one hour. | Elaboration: This content explains how social media managers structure a monthly posting plan using themes such as educational posts, product promotions, and engagement posts. | Execution Strategy: Show a sample calendar and explain how different post types maintain audience interest.",
      "17) Product Launch Campaign | Posting Day: Tuesday | Hook: Here’s how we launch a skincare product on social media. | Elaboration: The campaign strategy includes teaser posts, countdown posts, and launch-day announcements to build anticipation. | Execution Strategy: Use storytelling to reveal product features gradually.",
      "18) User-Generated Content Campaign | Posting Day: Wednesday | Hook: Our customers created the best skincare content for us. | Elaboration: Encourage customers to share their skincare results while tagging the brand. These posts can then be reshared by the brand to build trust. | Execution Strategy: Create a unique hashtag for the campaign.",
      "19) Educational Skincare Series | Posting Day: Thursday | Hook: Ingredient of the week: what it does for your skin. | Elaboration: Each week focuses on a skincare ingredient or concept, helping followers learn about skincare while associating the brand with expertise. | Execution Strategy: Keep visuals simple and informative.",
      "20) Influencer Collaboration Campaign | Posting Day: Friday | Hook: Watch how creators use our skincare products. | Elaboration: Partner with influencers who demonstrate products in their routines. Their audiences help expand brand reach. | Execution Strategy: Choose creators whose audiences match the brand’s target market.",
    ],
    Medium: [
      "21) Interactive Instagram Stories | Posting Day: Daily | Hook: Poll: Do you prefer gel or cream moisturizers? | Elaboration: Stories with polls, quizzes, and question stickers increase interaction and help brands understand audience preferences. | Execution Strategy: Use results to inform future product content.",
      "22) Customer Testimonial Campaign | Posting Day: Saturday | Hook: Real results from our customers. | Elaboration: Share positive reviews and testimonials from users who have tried the skincare products. | Execution Strategy: Include photos or videos of real customers.",
      "23) Skincare Tip of the Week | Posting Day: Monday | Hook: This simple skincare tip could change your routine. | Elaboration: Weekly educational tips keep the brand visible and provide value to followers. | Execution Strategy: Keep the content short and informative.",
      "24) Seasonal Skincare Campaign | Posting Day: Beginning of each season | Hook: Winter skincare routine to prevent dryness. | Elaboration: Adjust skincare messaging based on seasonal skin concerns. | Execution Strategy: Highlight products that address seasonal needs.",
      "25) Giveaway Campaign | Posting Day: Friday | Hook: Win our complete skincare set. | Elaboration: Followers enter by liking, sharing, or tagging friends. This increases reach and brand awareness. | Execution Strategy: Clearly state giveaway rules and duration.",
      "26) Skincare Tutorial Series | Posting Day: Tuesday | Hook: Step-by-step guide to using our skincare products. | Elaboration: Demonstrate how to correctly apply products to achieve the best results.",
      "27) Instagram Reels Strategy | Posting Day: Wednesday | Hook: Short skincare videos that reach thousands. | Elaboration: Short, engaging videos that highlight product benefits.",
      "28) Skincare FAQ Content | Posting Day: Thursday | Hook: You asked, we answered. | Elaboration: Answer frequently asked questions from customers.",
      "29) Brand Storytelling Campaign | Posting Day: Sunday | Hook: The story behind our skincare brand. | Elaboration: Explain the inspiration and mission behind the brand.",
      "30) Analytics-Based Content Strategy | Posting Day: Monthly review | Hook: What our social media data taught us. | Elaboration: Analyze engagement metrics to improve future content.",
      "31) Brand Story Video | Posting Day: Monday | Hook: Why I started this skincare brand. | Elaboration: Explain the personal story and motivation behind creating the brand.",
      "32) Behind-the-Scenes Production | Posting Day: Tuesday | Hook: How our skincare products are made. | Elaboration: Show the product preparation or packaging process.",
      "33) Packing Customer Orders | Posting Day: Wednesday | Hook: Packing your skincare orders today. | Elaboration: Show the process of preparing and shipping orders.",
      "34) Customer Testimonial Videos | Posting Day: Thursday | Hook: This customer’s results surprised us. | Elaboration: Feature real customer experiences.",
      "35) Product Demonstration | Posting Day: Friday | Hook: Here’s how to use our moisturizer. | Elaboration: Show how the product works in a routine.",
    ],
    High: [
      "36) Ingredient Education | Posting Day: Saturday | Hook: This ingredient is the secret behind our formula. | Elaboration: Explain the benefits of important ingredients.",
      "37) Full Skincare Routine Using Brand Products | Posting Day: Sunday | Hook: A complete skincare routine using our products.",
      "38) Brand Mission and Values | Posting Day: Monday | Hook: Our mission is simple: healthier skin.",
      "39) Limited-Time Promotion | Posting Day: Friday | Hook: 48-hour skincare sale.",
      "40) Skincare Challenge | Posting Day: Monday | Hook: Join our 7-day glow challenge.",
      "41) FAQ Video | Posting Day: Tuesday | Hook: Answering your skincare questions.",
      "42) Product Bundle Promotion | Posting Day: Wednesday | Hook: Our skincare bundle saves you money.",
      "43) Transformation Stories | Posting Day: Thursday | Hook: Customer results after 30 days.",
      "44) Packaging Reveal | Posting Day: Friday | Hook: New packaging reveal.",
      "45) Skincare Tips | Posting Day: Saturday | Hook: A simple tip for healthier skin.",
      "46) Routine Guide | Posting Day: Sunday | Hook: The correct order for skincare products.",
      "47) Influencer Collaboration | Posting Day: Tuesday | Hook: Watch creators test our skincare products.",
      "48) Community Engagement Post | Posting Day: Wednesday | Hook: What skincare problem do you struggle with most?",
      "49) Problem-Solution Content | Posting Day: Thursday | Hook: Struggling with dry skin? Try this.",
      "50) Long-Term Brand Vision | Posting Day: Sunday | Hook: Where we see our skincare brand in the future.",
    ],
  },
};

const authSection = document.getElementById("auth-section");
const authWrap = document.getElementById("auth-wrap");
const welcomePanel = document.getElementById("welcome-panel");
const authForms = document.getElementById("auth-forms");
const WELCOME_SESSION_KEY = "eptivo_welcome_continue";

function welcomeDismissedInSession() {
  try {
    return sessionStorage.getItem(WELCOME_SESSION_KEY) === "1";
  } catch {
    return true;
  }
}

function setWelcomeDismissedInSession() {
  try {
    sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function showWelcomeOnly() {
  welcomePanel?.classList.remove("hidden");
  authForms?.classList.add("hidden");
  authSection.classList.remove("hidden");
  if (authWrap) authWrap.classList.remove("hidden");
}

/** @param {"picker" | "signin" | "signup"} view */
function setAuthSubview(view) {
  const picker = document.getElementById("auth-mode-picker");
  const signInPanel = document.getElementById("auth-sign-in-panel");
  const signUpPanel = document.getElementById("auth-sign-up-panel");
  if (!picker || !signInPanel || !signUpPanel) return;
  const showPicker = view === "picker";
  const showSignIn = view === "signin";
  const showSignUp = view === "signup";
  picker.classList.toggle("hidden", !showPicker);
  signInPanel.classList.toggle("hidden", !showSignIn);
  signUpPanel.classList.toggle("hidden", !showSignUp);
}

const appSection = document.getElementById("app-section");
const currentUserEl = document.getElementById("current-user");
const ideasList = document.getElementById("ideas-list");
const savedList = document.getElementById("saved-list");
const feedbackHistory = document.getElementById("feedback-history");
const preferenceSummary = document.getElementById("preference-summary");
const chatMessages = document.getElementById("chat-messages");
const chatActions = document.getElementById("chat-actions");
const chatLikeBtn = document.getElementById("chat-like-btn");
const chatDislikeBtn = document.getElementById("chat-dislike-btn");
const chatSaveBtn = document.getElementById("chat-save-btn");
const toast = document.getElementById("toast");
const topbarDisplayName = document.getElementById("topbar-display-name");
const navDrawer = document.getElementById("nav-drawer");
const menuToggle = document.getElementById("menu-toggle");
const navDrawerBackdrop = document.getElementById("nav-drawer-backdrop");

let lastChatTopIdea = null;

function setChatActionTarget(idea) {
  lastChatTopIdea = idea || null;
  if (!chatActions) return;
  chatActions.classList.toggle("hidden", !lastChatTopIdea);
}

function openNavDrawer() {
  if (!navDrawer || !menuToggle || menuToggle.hidden) return;
  navDrawer.classList.add("is-open");
  navDrawer.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeNavDrawer() {
  if (!navDrawer || !menuToggle) return;
  navDrawer.classList.remove("is-open");
  navDrawer.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleNavDrawer() {
  if (navDrawer?.classList.contains("is-open")) closeNavDrawer();
  else openNavDrawer();
}

function readUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function currentSession() {
  return localStorage.getItem(STORAGE_KEYS.session) || "";
}

function setSession(username) {
  if (!username) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.session, username);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}

/** Stable UTF-8 → base64 (plain `btoa` throws on many non-ASCII characters). */
function hashPassword(password) {
  if (password == null) return "";
  const bytes = new TextEncoder().encode(String(password));
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

const AVATAR_DATA_URL_MAX_LEN = 450000;

let profilePhotoPending = null;

function normalizeUserProfile(user) {
  if (!user.profile || typeof user.profile !== "object") {
    user.profile = { displayName: "", avatarUrl: "" };
  }
  const p = user.profile;
  p.displayName = typeof p.displayName === "string" ? p.displayName.slice(0, 80) : "";
  let av = typeof p.avatarUrl === "string" ? p.avatarUrl.trim() : "";
  if (!av.startsWith("data:image/")) av = "";
  if (av.length > AVATAR_DATA_URL_MAX_LEN) av = "";
  p.avatarUrl = av;
}

function fileToResizedDataUrl(file, maxEdge = 320, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("not image"));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const scale = Math.min(1, maxEdge / Math.max(w, h));
      w = Math.round(w * scale);
      h = Math.round(h * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      try {
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch {
        reject(new Error("encode"));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    img.src = url;
  });
}

function profilePreviewInitials(displayName, username) {
  const name = (displayName || "").trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const a = parts[0].charAt(0);
      const b = parts[parts.length - 1].charAt(0);
      return `${a}${b}`.toUpperCase();
    }
    const compact = name.replace(/\s/g, "");
    if (compact.length >= 2) return compact.slice(0, 2).toUpperCase();
    if (compact.length === 1) {
      const u0 = (username || "").trim().charAt(0);
      return `${compact}${u0 || "?"}`.toUpperCase();
    }
  }
  const u = (username || "").trim();
  if (u.length >= 2) return u.slice(0, 2).toUpperCase();
  if (u.length === 1) return `${u}?`.toUpperCase();
  return "?";
}

function userInitialsFromUser(user) {
  if (!user) return "?";
  return profilePreviewInitials(user.profile?.displayName ?? "", user.username ?? "");
}

function setProfilePhotoPreview(displayName, username, imageDataUrl) {
  const preview = document.getElementById("profile-photo-preview");
  const initialEl = document.getElementById("profile-photo-initial");
  const thumb = document.getElementById("profile-photo-thumb");
  const removeBtn = document.getElementById("profile-photo-remove");
  const removeMenuBtn = document.getElementById("profile-photo-remove-menu-btn");
  if (!initialEl || !thumb || !removeBtn) return;
  const url =
    typeof imageDataUrl === "string" && imageDataUrl.startsWith("data:image/") ? imageDataUrl : "";
  const initials = profilePreviewInitials(displayName, username);
  if (url) {
    thumb.src = url;
    thumb.classList.remove("hidden");
    initialEl.classList.add("hidden");
    preview?.classList.add("profile-avatar--has-photo");
    preview?.setAttribute("aria-label", "Profile photo");
    removeBtn.classList.remove("hidden");
    removeMenuBtn?.classList.remove("hidden");
  } else {
    thumb.removeAttribute("src");
    thumb.classList.add("hidden");
    initialEl.classList.remove("hidden");
    initialEl.textContent = initials;
    preview?.classList.remove("profile-avatar--has-photo");
    preview?.setAttribute("aria-label", `Profile avatar, initials ${initials}`);
    removeBtn.classList.add("hidden");
    removeMenuBtn?.classList.add("hidden");
  }
}

function refreshProfileFormInitialsIfNoPhoto() {
  const thumb = document.getElementById("profile-photo-thumb");
  if (thumb && !thumb.classList.contains("hidden")) return;
  const dn = document.getElementById("profile-display-name")?.value ?? "";
  const un = document.getElementById("profile-username")?.value ?? "";
  setProfilePhotoPreview(dn, un, "");
}

function findUserRecord(username) {
  const q = (username || "").trim().toLowerCase();
  if (!q) return null;
  return readUsers().find((x) => (x.username || "").trim().toLowerCase() === q) ?? null;
}

function getUser(username) {
  const u = findUserRecord(username);
  if (!u) return undefined;
  const copy = JSON.parse(JSON.stringify(u));
  normalizeUserProfile(copy);
  return copy;
}

function effectiveDisplayName(user) {
  if (!user) return "there";
  const d = (user.profile?.displayName ?? "").trim();
  return d || user.username || "there";
}

function updateUser(updatedUser) {
  const users = readUsers().map((u) => {
    if (u.username !== updatedUser.username) return u;
    const next = { ...u, ...updatedUser };
    if (next.passwordHash == null || next.passwordHash === "") {
      next.passwordHash = u.passwordHash;
    }
    if (next.email == null || next.email === "") {
      next.email = u.email;
    }
    return next;
  });
  writeUsers(users);
}

function scoreIdea(user, text, niche, goal, effort, platform) {
  let score = 0;
  const key = text.toLowerCase();
  const likes = user.likes || {};
  const dislikes = user.dislikes || {};

  score += likes[key] ? likes[key] * 2 : 0;
  score -= dislikes[key] ? dislikes[key] * 2 : 0;
  score += user.preferences?.niche?.[niche] || 0;
  score += user.preferences?.goal?.[goal] || 0;
  score += user.preferences?.effort?.[effort] || 0;
  score += user.preferences?.platform?.[platform] || 0;

  return score;
}

function scoreQueryRelevance(text, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return 0;
  const t = String(text || "").toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/i).filter((w) => w.length >= 3).slice(0, 8);
  if (!tokens.length) return 0;
  let hits = 0;
  tokens.forEach((tok) => {
    if (t.includes(tok)) hits += 1;
  });
  return hits * 3;
}

function buildIdeas(user, form) {
  const { niche, goal, effort, platform, query, limit } = form;
  const base = (RULES[niche] && RULES[niche][effort]) || [];
  const max = Math.max(1, Math.min(20, Number(limit) || 8));

  return base
    .map((text) => ({
      baseText: text,
      text: `${text} (${platform} | ${goal})`,
      niche,
      goal,
      effort,
      platform,
      score:
        scoreIdea(user, text, niche, goal, effort, platform) + scoreQueryRelevance(text, query),
    }))
    .sort((a, b) => b.score - a.score);
}

function parseIdeaBaseTextToFields(baseText, idea) {
  const raw = String(baseText || "");
  const parts = raw.split(" | ").map((s) => s.trim()).filter(Boolean);
  const titleRaw = parts[0] || "Content idea";

  const numberMatch = titleRaw.match(/^\s*(\d+)[).]\s*/);
  const number = numberMatch ? Number(numberMatch[1]) : null;
  const title = titleRaw.replace(/^\s*\d+[).]\s*/g, "").trim();

  const getKV = (seg) => {
    const idx = seg.indexOf(":");
    if (idx <= 0 || idx > 40) return null;
    const k = seg.slice(0, idx).trim();
    const v = seg.slice(idx + 1).trim();
    if (!k || !v) return null;
    return { k: k.toLowerCase(), v };
  };

  const bag = {};
  const extras = [];
  parts.slice(1).forEach((seg) => {
    const kv = getKV(seg);
    if (!kv) extras.push(seg);
    else bag[kv.k] = kv.v;
  });

  const day =
    bag["posting day"] ||
    bag["best day to post"] ||
    bag["best day"] ||
    bag["day"] ||
    bag["posting"] ||
    "";
  const hook = bag["hook"] || "";
  const elaboration =
    bag["elaboration"] ||
    bag["flow"] ||
    bag["content flow"] ||
    bag["concept"] ||
    bag["examples"] ||
    extras.join(" ") ||
    "";
  const strategy = bag["strategy"] || bag["execution strategy"] || "";

  // Ensure nothing is empty in chat.
  const niche = idea?.niche || "";
  const safeHook =
    hook.trim() ||
    `Try this ${niche ? `${niche.toLowerCase()} ` : ""}idea: ${title}.`;

  const safeElaboration =
    elaboration.trim() ||
    "Show what you’re making, how you do it step-by-step, and end with the final result so viewers can copy it.";

  const safeStrategy =
    strategy.trim() ||
    "Use clear captions, keep the first 2 seconds visually strong, and end with a CTA like “save this” or “comment which one you’d try.”";

  return {
    number,
    title,
    day: day.trim() || "Any day",
    hook: safeHook,
    elaboration: safeElaboration,
    strategy: safeStrategy,
  };
}

function formatIdeaForChat(baseText, idea) {
  const f = parseIdeaBaseTextToFields(baseText, idea);
  const heading = f.number != null ? `${f.number}. ${f.title}` : f.title;
  return `${heading}\n\nPosting Day: ${f.day}\n\nHook:\n“${f.hook}”\n\nElaboration:\n${f.elaboration}\n\nStrategy:\n${f.strategy}`;
}

function adjustPreference(user, field, value, delta) {
  user.preferences = user.preferences || {};
  user.preferences[field] = user.preferences[field] || {};
  user.preferences[field][value] = (user.preferences[field][value] || 0) + delta;
}

function feedbackIdea(username, idea, type) {
  const user = getUser(username);
  if (!user) return;

  user.likes = user.likes || {};
  user.dislikes = user.dislikes || {};
  user.saved = user.saved || [];

  const baseKey = idea.text.split(" (")[0].toLowerCase();

  if (type === "like") {
    user.likes[baseKey] = (user.likes[baseKey] || 0) + 1;
    adjustPreference(user, "niche", idea.niche, 1);
    adjustPreference(user, "goal", idea.goal, 1);
    adjustPreference(user, "effort", idea.effort, 1);
    adjustPreference(user, "platform", idea.platform, 1);
  } else if (type === "dislike") {
    user.dislikes[baseKey] = (user.dislikes[baseKey] || 0) + 1;
    adjustPreference(user, "niche", idea.niche, -1);
    adjustPreference(user, "goal", idea.goal, -1);
    adjustPreference(user, "effort", idea.effort, -1);
    adjustPreference(user, "platform", idea.platform, -1);
  } else if (type === "save") {
    if (!user.saved.some((s) => s.text === idea.text)) {
      user.saved.push({ ...idea, savedAt: new Date().toISOString() });
    }
  }

  updateUser(user);
  renderSaved(username);
  renderPreferenceLearning(username);
}

function renderIdeas(username, ideas) {
  ideasList.innerHTML = "";

  if (!ideas.length) {
    ideasList.innerHTML = "<p class='muted'>No ideas generated yet.</p>";
    return;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function stripLeadingNumbering(title) {
    return String(title || "")
      .trim()
      .replace(/^\d+\)\s*/g, "")
      .replace(/^\d+\.\s*/g, "");
  }

  function generateFallbacks({ title, niche, day, hook, flow, strategy }) {
    const safeTitle = (title || "Content idea").trim();
    const safeNiche = (niche || "").trim();
    const safeHook =
      (hook && hook.trim()) ||
      `Try this ${safeNiche ? `${safeNiche.toLowerCase()} ` : ""}idea: ${safeTitle}.`;

    const t = safeTitle.toLowerCase();
    const derivedDay =
      (day && day.trim()) ||
      (t.includes("sunday") ? "Sunday" : "") ||
      (t.includes("monday") ? "Monday" : "") ||
      (t.includes("tuesday") ? "Tuesday" : "") ||
      (t.includes("wednesday") ? "Wednesday" : "") ||
      (t.includes("thursday") ? "Thursday" : "") ||
      (t.includes("friday") ? "Friday" : "") ||
      (t.includes("saturday") ? "Saturday" : "") ||
      "Any day";

    let derivedFlow = (flow && flow.trim()) || "";
    if (!derivedFlow) {
      if (t.includes("poll") || t.includes("quiz") || t.includes("vote")) {
        derivedFlow =
          "Show two options on screen, ask viewers to choose, then share your pick and why. End with a quick follow-up question to spark replies.";
      } else if (t.includes("challenge")) {
        derivedFlow =
          "Introduce the rules, show the attempt step-by-step, and finish with the result/reveal. Add a quick recap of what worked and what you’d change next time.";
      } else if (t.includes("review") || t.includes("rating")) {
        derivedFlow =
          "Open with the item and your first impression, test it on camera, then summarize pros/cons and who it’s best for. Close with a clear verdict.";
      } else if (t.includes("routine")) {
        derivedFlow =
          "Show the routine in a simple sequence of steps (start → middle → finish) with short captions for each step. End with the final result and one takeaway tip.";
      } else if (t.includes("behind") || t.includes("bts") || t.includes("story")) {
        derivedFlow =
          "Set the context, show 3–5 behind-the-scenes moments, then wrap with the outcome and what viewers should notice/learn from it.";
      } else if (t.includes("tips") || t.includes("hacks") || t.includes("mistakes")) {
        derivedFlow =
          "Share 3 quick points with an on-screen label for each, show a mini example, then end with a summary line viewers can screenshot/save.";
      } else {
        derivedFlow =
          "Start with a quick setup, show the main steps in order, and end with a result + one practical tip viewers can use immediately.";
      }
    }

    let derivedStrategy = (strategy && strategy.trim()) || "";
    if (!derivedStrategy) {
      if (t.includes("poll") || t.includes("quiz") || t.includes("vote")) {
        derivedStrategy =
          "Use this to drive replies and story taps. Post the results the next day to create a second piece of content.";
      } else if (t.includes("challenge") || t.includes("trend") || t.includes("viral")) {
        derivedStrategy =
          "Mention the trend/challenge in the caption for discoverability. Ask viewers to tag you if they try it to generate UGC and shares.";
      } else if (safeNiche.toLowerCase().includes("food")) {
        derivedStrategy =
          "Make the first 2 seconds visually strong (close-up + motion), add captions, and end with a CTA like “save this” or “comment your favorite.”";
      } else if (safeNiche.toLowerCase().includes("fashion")) {
        derivedStrategy =
          "Use fast transitions and clear on-screen labels. End with a CTA like “which look wins?” to drive comments and saves.";
      } else if (safeNiche.toLowerCase().includes("skincare")) {
        derivedStrategy =
          "Keep lighting consistent for credibility, add short captions, and end with a CTA asking viewers their skin type or product experience.";
      } else {
        derivedStrategy =
          "Keep it scannable with captions, use a clear CTA (save/comment), and reuse the same format as a recurring series to build consistency.";
      }
    }

    return {
      title: safeTitle,
      day: derivedDay,
      hook: safeHook,
      flow: derivedFlow,
      strategy: derivedStrategy,
    };
  }

  function formatIdeaTextAsHtml(text, idea) {
    const raw = String(text || "");
    const parts = raw.split(" | ").map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return "<p class='muted'>—</p>";

    const title = stripLeadingNumbering(parts[0]);

    const getKV = (seg) => {
      const idx = seg.indexOf(":");
      if (idx <= 0 || idx > 40) return null;
      const k = seg.slice(0, idx).trim();
      const v = seg.slice(idx + 1).trim();
      if (!k || !v) return null;
      return { k, v };
    };

    const bag = {};
    const extras = [];
    parts.slice(1).forEach((seg) => {
      const kv = getKV(seg);
      if (!kv) {
        extras.push(seg);
        return;
      }
      const key = kv.k.toLowerCase();
      bag[key] = kv.v;
    });

    const day =
      bag["day"] ||
      bag["posting day"] ||
      bag["posting"] ||
      bag["best day to post"] ||
      bag["best day"];
    const hook = bag["hook"];
    const flow =
      bag["flow"] ||
      bag["content flow"] ||
      bag["elaboration"] ||
      bag["concept"] ||
      bag["examples"] ||
      extras.join(" ");
    const strategy = bag["strategy"] || bag["execution strategy"];

    const filled = generateFallbacks({
      title,
      niche: idea?.niche,
      day,
      hook,
      flow,
      strategy,
    });

    const out = [];
    out.push(`<p class="idea-line idea-line--title">${escapeHtml(filled.title)}</p>`);
    out.push(
      `<p class="idea-line"><strong>Day:</strong> ${escapeHtml(filled.day)}</p>`
    );
    out.push(
      `<p class="idea-line"><strong>Hook:</strong> ${escapeHtml(filled.hook)}</p>`
    );
    out.push(
      `<p class="idea-line"><strong>Flow:</strong> ${escapeHtml(filled.flow)}</p>`
    );
    out.push(
      `<p class="idea-line"><strong>Strategy:</strong> ${escapeHtml(filled.strategy)}</p>`
    );

    return out.join("");
  }

  ideas.forEach((idea) => {
    const card = document.createElement("article");
    card.className = "idea";

    card.innerHTML = `
      ${formatIdeaTextAsHtml(idea.text, idea)}
      <div class="idea-meta">Score: ${idea.score} | ${idea.niche} | ${idea.effort}</div>
      <div class="idea-actions">
        <button data-action="like">Like</button>
        <button data-action="dislike" class="secondary">Dislike</button>
        <button data-action="save">Save</button>
      </div>
    `;

    card.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        feedbackIdea(username, idea, action);
        showToast(`Recorded: ${action} for this idea.`);
      });
    });

    ideasList.appendChild(card);
  });
}

function renderSaved(username) {
  const user = getUser(username);
  if (!user) return;

  const saved = user.saved || [];
  savedList.innerHTML = "";

  if (!saved.length) {
    savedList.innerHTML = "<p class='muted'>No saved ideas yet.</p>";
    return;
  }

  saved.forEach((idea) => {
    const item = document.createElement("article");
    item.className = "idea";
    const raw = String(idea.text || "");
    const parts = raw.split(" | ").map((s) => s.trim()).filter(Boolean);
    const first = String(parts[0] || "Saved idea")
      .trim()
      .replace(/^\d+\)\s*/g, "")
      .replace(/^\d+\.\s*/g, "");
    item.innerHTML = `<p class="idea-line idea-line--title">${first
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")}</p><div class="idea-meta">Saved</div>`;
    savedList.appendChild(item);
  });
}

function topCounts(mapObj, limit = 5) {
  return Object.entries(mapObj || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function renderPreferenceLearning(username) {
  const user = getUser(username);
  if (!user || !preferenceSummary) return;

  const likesTotal = Object.values(user.likes || {}).reduce((sum, n) => sum + n, 0);
  const dislikesTotal = Object.values(user.dislikes || {}).reduce((sum, n) => sum + n, 0);
  const nichePrefs = topCounts(user.preferences?.niche || {}, 4);
  const goalPrefs = topCounts(user.preferences?.goal || {}, 4);
  const effortPrefs = topCounts(user.preferences?.effort || {}, 4);
  const topLiked = topCounts(user.likes || {}, 3);
  const topDisliked = topCounts(user.dislikes || {}, 3);

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const makeBarBlock = (title, rows, emptyText) => {
    if (!rows.length) {
      return `<article class="idea chart"><p class="chart-title">${escapeHtml(
        title
      )}</p><p class="muted">${escapeHtml(emptyText)}</p></article>`;
    }
    const max = Math.max(...rows.map(([, v]) => Number(v) || 0), 1);
    const bars = rows
      .map(([name, value]) => {
        const v = Number(value) || 0;
        const pct = Math.max(6, Math.round((v / max) * 100));
        return `
          <div class="bar-row">
            <div class="bar-label">${escapeHtml(name)}</div>
            <div class="bar-track" aria-hidden="true">
              <div class="bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="bar-value">${escapeHtml(v)}</div>
          </div>
        `;
      })
      .join("");

    return `<article class="idea chart"><p class="chart-title">${escapeHtml(
      title
    )}</p><div class="bar-list">${bars}</div></article>`;
  };

  preferenceSummary.innerHTML = `
    <article class="idea chart">
      <p class="chart-title">Learning Summary</p>
      <div class="chart-kpis">
        <div class="kpi">
          <div class="kpi-label">Likes</div>
          <div class="kpi-value">${likesTotal}</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">Dislikes</div>
          <div class="kpi-value">${dislikesTotal}</div>
        </div>
      </div>
    </article>
    ${makeBarBlock("Top niche preferences", nichePrefs, "No learning yet.")}
    ${makeBarBlock("Top goal preferences", goalPrefs, "No learning yet.")}
    ${makeBarBlock("Top effort preferences", effortPrefs, "No learning yet.")}
    ${makeBarBlock("Most liked ideas", topLiked, "No liked ideas yet.")}
    ${makeBarBlock("Most disliked ideas", topDisliked, "No disliked ideas yet.")}
  `;
}

function renderFeedback(username) {
  const user = getUser(username);
  if (!user) return;
  feedbackHistory.innerHTML = "";
  (user.feedback || []).forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    feedbackHistory.appendChild(li);
  });
}

function addChatMessage(role, text, options = {}) {
  if (!chatMessages) return;
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${role}`;
  const shouldAnimate = role === "bot" && options.animate;
  if (!shouldAnimate) {
    bubble.textContent = text;
  } else {
    bubble.textContent = "";
  }
  chatMessages.appendChild(bubble);

  const scrollToBottom = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  if (!shouldAnimate) {
    scrollToBottom();
    return;
  }

  const full = String(text || "");
  const baseDelayMs = Number.isFinite(options.speedMs) ? options.speedMs : 12;
  const punctuationDelayMs = Number.isFinite(options.punctuationDelayMs)
    ? options.punctuationDelayMs
    : 120;
  let i = 0;

  const step = () => {
    if (i >= full.length) {
      bubble.dataset.typing = "done";
      scrollToBottom();
      return;
    }

    const ch = full.charAt(i);
    bubble.textContent += ch;
    i += 1;
    scrollToBottom();

    const extra =
      ch === "." || ch === "!" || ch === "?" || ch === "\n" ? punctuationDelayMs : 0;
    setTimeout(step, baseDelayMs + extra);
  };

  bubble.dataset.typing = "true";
  step();
}

function parseChatIntent(prompt) {
  const text = prompt.toLowerCase();
  const niche = Object.keys(RULES).find((n) => text.includes(n.toLowerCase())) || "Food";
  const goal = ["Engagement", "Growth", "Education", "Sales"].find((g) =>
    text.includes(g.toLowerCase())
  ) || "Engagement";
  const effort = ["Low", "Medium", "High"].find((e) => text.includes(e.toLowerCase())) || "Low";
  return { niche, goal, effort };
}

function parseRequestedIdeaCount(prompt, fallback = 3) {
  const raw = String(prompt || "").toLowerCase();
  const digit = raw.match(/\b(\d{1,2})\b/);
  let n = digit ? Number(digit[1]) : NaN;
  if (!Number.isFinite(n)) {
    const words = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
    };
    const word = raw.match(
      /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/
    );
    if (word) n = words[word[1]];
  }
  if (!Number.isFinite(n)) n = fallback;
  return Math.max(1, Math.min(20, n));
}

function chatbotReply(username, prompt) {
  const user = getUser(username);
  if (!user) return "Please log in to use the chatbot.";

  const name = effectiveDisplayName(user);

  const normalized = prompt.toLowerCase();
  if (normalized.includes("help")) {
    return `${name}, try prompts like:\n- Give me low effort food ideas for engagement\n- Show my saved ideas\n- Recommend lifestyle content for growth\n\nYou can open Set profile in the menu to change your name, username, or picture.`;
  }
  if (normalized.includes("saved")) {
    const saved = user.saved || [];
    if (!saved.length) return `${name}, you do not have saved ideas yet.`;
    return `${name}, here are your latest saved ideas:\n- ${saved
      .slice(-3)
      .map((s) => s.text)
      .join("\n- ")}`;
  }

  const intent = parseChatIntent(prompt);
  const count = parseRequestedIdeaCount(prompt, 3);
  const ideas = buildIdeas(user, { ...intent, platform: PLATFORM, limit: count }).slice(0, count);
  if (!ideas.length) {
    return `${name}, I could not find ideas for that request. Try another niche or effort level.`;
  }

  const blocks = ideas.map((i) => formatIdeaForChat(i.baseText || i.text, i));
  return `${name}, here are top ${intent.effort.toLowerCase()}-effort ${intent.niche} ideas for ${intent.goal.toLowerCase()} on Instagram:\n\n${blocks.join(
    "\n\n---\n\n"
  )}`;
}

function clearProfilePhotoFileInputs() {
  ["profile-photo-gallery", "profile-photo-files"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

async function applyProfilePhotoFromFile(file) {
  if (!file) {
    showToast("No file selected.");
    return;
  }
  if (!file.type || !file.type.startsWith("image/")) {
    showToast("Please choose an image file.");
    return;
  }
  try {
    const dataUrl = await fileToResizedDataUrl(file);
    if (dataUrl.length > AVATAR_DATA_URL_MAX_LEN) {
      showToast("That image is too large after processing. Try a smaller file.");
      return;
    }
    profilePhotoPending = dataUrl;
    const dn = document.getElementById("profile-display-name")?.value ?? "";
    const un = document.getElementById("profile-username")?.value ?? currentSession() ?? "";
    setProfilePhotoPreview(dn, un, dataUrl);
  } catch {
    showToast("Could not use that image. Try another file.");
  }
}

function renderProfileForm(username) {
  const user = getUser(username);
  if (!user) return;
  profilePhotoPending = null;
  clearProfilePhotoFileInputs();
  const p = user.profile || {};
  const dn = document.getElementById("profile-display-name");
  const un = document.getElementById("profile-username");
  if (dn) dn.value = p.displayName != null ? p.displayName : "";
  if (un) un.value = user.username || "";
  const avatar =
    typeof p.avatarUrl === "string" && p.avatarUrl.startsWith("data:image/") ? p.avatarUrl : "";
  setProfilePhotoPreview(dn?.value ?? "", user.username, avatar);
}

function updateTopbarDisplayName(user) {
  if (!topbarDisplayName) return;
  if (!user) {
    topbarDisplayName.textContent = "";
    topbarDisplayName.removeAttribute("title");
    topbarDisplayName.removeAttribute("aria-label");
    topbarDisplayName.classList.remove("topbar-display-name--photo");
    topbarDisplayName.classList.add("hidden");
    return;
  }
  const full = effectiveDisplayName(user);
  const avatar =
    typeof user.profile?.avatarUrl === "string" && user.profile.avatarUrl.startsWith("data:image/")
      ? user.profile.avatarUrl
      : "";
  topbarDisplayName.textContent = "";
  topbarDisplayName.title = full;
  topbarDisplayName.setAttribute("aria-label", `Signed in as ${full}`);
  topbarDisplayName.classList.remove("hidden");
  topbarDisplayName.classList.toggle("topbar-display-name--photo", Boolean(avatar));
  if (avatar) {
    const img = document.createElement("img");
    img.src = avatar;
    img.alt = "";
    img.className = "topbar-avatar-img";
    topbarDisplayName.appendChild(img);
  } else {
    topbarDisplayName.textContent = userInitialsFromUser(user);
  }
}

function setActiveTab(tabId) {
  if (!APP_PAGES.includes(tabId)) tabId = DEFAULT_APP_PAGE;
  if (tabId !== "profile-page") closeProfileAvatarMenu();
  document.querySelectorAll(".app-drawer-nav [data-page]").forEach((link) => {
    const isActive = link.getAttribute("data-page") === tabId;
    link.classList.toggle("active", isActive);
  });
  document.querySelectorAll(".app-page").forEach((page) => page.classList.add("hidden"));
  const selectedPage = document.getElementById(tabId);
  if (selectedPage) selectedPage.classList.remove("hidden");
  if (tabId === "profile-page") {
    const session = currentSession();
    if (session) renderProfileForm(session);
  }
}

function applyRouteFromHash() {
  const raw = (location.hash || "").replace(/^#/, "");
  const page = APP_PAGES.includes(raw) ? raw : DEFAULT_APP_PAGE;
  setActiveTab(page);
  if (raw !== page) {
    history.replaceState(null, "", `#${page}`);
  }
}

function switchToApp(username) {
  const user = getUser(username);
  welcomePanel?.classList.add("hidden");
  authForms?.classList.add("hidden");
  authSection.classList.add("hidden");
  if (authWrap) authWrap.classList.add("hidden");
  appSection.classList.remove("hidden");
  applyRouteFromHash();
  if (!user) return;
  if (menuToggle) menuToggle.hidden = false;
  if (currentUserEl) {
    currentUserEl.textContent = `${username} (${user.role || "No role"})`;
  }
  updateTopbarDisplayName(user);
  renderSaved(username);
  renderPreferenceLearning(username);
  renderFeedback(username);
  if (chatMessages && !chatMessages.children.length) {
    const nm = effectiveDisplayName(user);
    addChatMessage(
      "bot",
      `Hi ${nm}, I’m EPTIVO AI.`,
      { animate: true }
    );
  }
}

function switchToAuth() {
  closeNavDrawer();
  updateTopbarDisplayName(null);
  appSection.classList.add("hidden");
  welcomePanel?.classList.add("hidden");
  authForms?.classList.remove("hidden");
  authSection.classList.remove("hidden");
  if (authWrap) authWrap.classList.remove("hidden");
  if (menuToggle) menuToggle.hidden = true;
  setAuthSubview("picker");
}

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const role = document.getElementById("reg-role").value;

  const users = readUsers();
  if (!ALLOWED_ROLES.includes(role)) {
    showToast("Please select a valid role.");
    return;
  }
  if (users.some((u) => (u.username || "").trim().toLowerCase() === username.toLowerCase())) {
    showToast("Username already exists.");
    return;
  }

  users.push({
    username,
    email,
    role,
    passwordHash: hashPassword(password),
    likes: {},
    dislikes: {},
    saved: [],
    feedback: [],
    preferences: {},
    profile: { displayName: "", avatarUrl: "" },
  });
  writeUsers(users);
  showToast("Account created. You can now log in.");
  e.target.reset();
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const record = findUserRecord(usernameInput);
  if (!record || !record.passwordHash || record.passwordHash !== hashPassword(password)) {
    showToast("Invalid username or password.");
    return;
  }
  const canonical = record.username;
  setSession(canonical);
  switchToApp(canonical);
  e.target.reset();
});

document.getElementById("logout-btn").addEventListener("click", () => {
  setSession("");
  setWelcomeDismissedInSession();
  switchToAuth();
  showToast("Logged out.");
});

function onWelcomeContinue() {
  setWelcomeDismissedInSession();
  switchToAuth();
}

document.getElementById("welcome-continue-btn")?.addEventListener("click", onWelcomeContinue);

document.getElementById("auth-pick-sign-in")?.addEventListener("click", () => {
  setAuthSubview("signin");
  document.getElementById("login-username")?.focus();
});

document.getElementById("auth-pick-sign-up")?.addEventListener("click", () => {
  setAuthSubview("signup");
  document.getElementById("reg-username")?.focus();
});

document.getElementById("auth-back-to-picker-from-sign-in")?.addEventListener("click", () => {
  setAuthSubview("picker");
});

document.getElementById("auth-back-to-picker-from-sign-up")?.addEventListener("click", () => {
  setAuthSubview("picker");
});

function wirePasswordToggles(root = document) {
  root.querySelectorAll(".password-toggle[data-password-for]").forEach((btn) => {
    if (btn.dataset.wired === "1") return;
    btn.dataset.wired = "1";
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-password-for");
      const input = id ? document.getElementById(id) : null;
      if (!input || (input.type !== "password" && input.type !== "text")) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.textContent = show ? "Hide" : "Show";
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      btn.setAttribute("aria-pressed", show ? "true" : "false");
    });
  });
}

wirePasswordToggles();

menuToggle?.addEventListener("click", () => toggleNavDrawer());
navDrawerBackdrop?.addEventListener("click", () => closeNavDrawer());

document.querySelectorAll(".app-drawer-nav [data-page]").forEach((link) => {
  link.addEventListener("click", () => closeNavDrawer());
});

function closeProfileAvatarMenu() {
  const menu = document.getElementById("profile-avatar-source-menu");
  const trigger = document.getElementById("profile-avatar-camera-trigger");
  menu?.classList.add("hidden");
  trigger?.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", (e) => {
  const widget = document.querySelector(".profile-avatar-widget");
  if (widget && !widget.contains(e.target)) closeProfileAvatarMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navDrawer?.classList.contains("is-open")) closeNavDrawer();
  if (e.key === "Escape") closeProfileAvatarMenu();
});

document.getElementById("profile-avatar-camera-trigger")?.addEventListener("click", (ev) => {
  ev.stopPropagation();
  const menu = document.getElementById("profile-avatar-source-menu");
  const trigger = document.getElementById("profile-avatar-camera-trigger");
  if (!menu || !trigger) return;
  menu.classList.toggle("hidden");
  const open = !menu.classList.contains("hidden");
  trigger.setAttribute("aria-expanded", open ? "true" : "false");
});

function openFilePickerById(inputId) {
  const input = document.getElementById(inputId);
  if (!input) {
    showToast("Photo picker unavailable.");
    return;
  }
  // Chrome supports showPicker() on file inputs in many versions.
  if (typeof input.showPicker === "function") {
    input.showPicker();
    return;
  }
  input.click();
}

document.getElementById("profile-photo-gallery-btn")?.addEventListener("click", (ev) => {
  ev.stopPropagation();
  openFilePickerById("profile-photo-gallery");
});

document.getElementById("profile-photo-files-btn")?.addEventListener("click", (ev) => {
  ev.stopPropagation();
  openFilePickerById("profile-photo-files");
});

document.getElementById("generator-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = currentSession();
  const user = getUser(username);
  if (!user) return;

  const query = document.getElementById("custom-idea")?.value?.trim() || "";
  const limit = document.getElementById("ideas-count")?.value;

  const form = {
    niche: document.getElementById("niche").value,
    goal: document.getElementById("goal").value,
    effort: document.getElementById("effort").value,
    platform: PLATFORM,
    query,
    limit,
  };

  const ideas = buildIdeas(user, form).slice(0, Math.max(1, Math.min(20, Number(limit) || 8)));
  renderIdeas(username, ideas);
});

document.getElementById("feedback-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = currentSession();
  const user = getUser(username);
  if (!user) return;

  const text = document.getElementById("feedback-input").value.trim();
  if (!text) return;

  const hp = document.getElementById("feedback-website")?.value?.trim() || "";
  if (hp) return;

  user.feedback = user.feedback || [];
  user.feedback.unshift(text);
  user.feedback = user.feedback.slice(0, 20);
  updateUser(user);
  renderFeedback(username);
  renderPreferenceLearning(username);
  e.target.reset();
  showToast("Feedback saved.");

  if (SEND_FEEDBACK_TO_EMAIL) {
    const payload = {
      message: text,
      username: user.username || username,
      role: user.role || "",
      page: location.hash || "#",
      userAgent: navigator.userAgent,
      createdAt: new Date().toISOString(),
    };
    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // If email send fails, we still keep the local feedback.
      showToast("Saved locally, but email send failed.");
    });
  }
});


document.getElementById("profile-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const sessionUser = currentSession();
  const user = getUser(sessionUser);
  if (!user) return;

  const displayName = document.getElementById("profile-display-name").value.trim().slice(0, 80);
  const newUsername = document.getElementById("profile-username").value.trim().slice(0, 24);
  if (newUsername.length < 3) {
    showToast("Username must be at least 3 characters.");
    return;
  }

  const oldUsername = user.username;
  if (newUsername !== oldUsername && readUsers().some((u) => u.username === newUsername)) {
    showToast("That username is already taken.");
    return;
  }

  let avatarUrl = user.profile?.avatarUrl || "";
  if (profilePhotoPending !== null) {
    avatarUrl = profilePhotoPending;
  }

  user.username = newUsername;
  user.profile = { displayName, avatarUrl };
  normalizeUserProfile(user);

  const users = readUsers().map((u) => {
    if (u.username !== oldUsername) return u;
    return { ...u, ...user, passwordHash: u.passwordHash, email: user.email ?? u.email };
  });
  writeUsers(users);

  if (sessionUser === oldUsername) {
    setSession(newUsername);
  }

  profilePhotoPending = null;
  const refreshed = getUser(newUsername);
  updateTopbarDisplayName(refreshed);
  showToast("Profile updated.");
  history.replaceState(null, "", `#${DEFAULT_APP_PAGE}`);
  setActiveTab(DEFAULT_APP_PAGE);
});

["profile-photo-gallery", "profile-photo-files"].forEach((id) => {
  document.getElementById(id)?.addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    await applyProfilePhotoFromFile(file);
    closeProfileAvatarMenu();
    clearProfilePhotoFileInputs();
  });
});

document.getElementById("profile-photo-remove")?.addEventListener("click", () => {
  profilePhotoPending = "";
  clearProfilePhotoFileInputs();
  const dn = document.getElementById("profile-display-name")?.value ?? "";
  const un = document.getElementById("profile-username")?.value ?? currentSession() ?? "";
  setProfilePhotoPreview(dn, un, "");
});

document.getElementById("profile-photo-remove-menu-btn")?.addEventListener("click", (ev) => {
  ev.stopPropagation();
  profilePhotoPending = "";
  clearProfilePhotoFileInputs();
  const dn = document.getElementById("profile-display-name")?.value ?? "";
  const un = document.getElementById("profile-username")?.value ?? currentSession() ?? "";
  setProfilePhotoPreview(dn, un, "");
  closeProfileAvatarMenu();
});

document.getElementById("profile-cancel-btn")?.addEventListener("click", () => {
  const session = currentSession();
  if (!session) return;
  profilePhotoPending = null;
  clearProfilePhotoFileInputs();
  closeProfileAvatarMenu();
  renderProfileForm(session);
  history.replaceState(null, "", `#${DEFAULT_APP_PAGE}`);
  setActiveTab(DEFAULT_APP_PAGE);
});

document.getElementById("profile-display-name")?.addEventListener("input", refreshProfileFormInitialsIfNoPhoto);
document.getElementById("profile-username")?.addEventListener("input", refreshProfileFormInitialsIfNoPhoto);

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = currentSession();
  const input = document.getElementById("chat-input");
  const prompt = input.value.trim();
  if (!prompt) return;

  addChatMessage("user", prompt);
  const user = getUser(username);
  if (!user) return;
  const intent = parseChatIntent(prompt);
  const count = parseRequestedIdeaCount(prompt, 3);
  const ideas = buildIdeas(user, { ...intent, platform: PLATFORM, limit: count }).slice(0, count);
  setChatActionTarget(ideas[0] || null);
  const reply = chatbotReply(username, prompt);
  addChatMessage("bot", reply, { animate: true });
  input.value = "";
});

window.addEventListener("hashchange", () => {
  if (appSection.classList.contains("hidden")) return;
  applyRouteFromHash();
});

function applyChatAction(type) {
  const username = currentSession();
  if (!username) return;
  if (!lastChatTopIdea) {
    showToast("Generate ideas in chat first.");
    return;
  }
  feedbackIdea(username, lastChatTopIdea, type);
  showToast(`Recorded: ${type} for the top chat idea.`);
}

chatLikeBtn?.addEventListener("click", () => applyChatAction("like"));
chatDislikeBtn?.addEventListener("click", () => applyChatAction("dislike"));
chatSaveBtn?.addEventListener("click", () => applyChatAction("save"));

function init() {
  const session = currentSession();
  if (session && getUser(session)) {
    switchToApp(session);
  } else if (welcomeDismissedInSession()) {
    switchToAuth();
  } else {
    showWelcomeOnly();
  }
}

init();
