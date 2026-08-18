import type { FaqItem } from '../types/learn';

export const FAQ_ITEMS: FaqItem[] = [
  // ---------------------------------------------------------------------------
  // 1. Teleoperation Guide
  // ---------------------------------------------------------------------------
  {
    id: 'teleop-setup',
    category: 'teleop',
    question: 'What setup is recommended for the best tele-op experience?',
    answer: `For optimal tele-op performance, we recommend:
• Device: Use a PC, desktop, or laptop for the best experience.
• Network: Use a stable and fast internet connection.
• Operating System: Use a smoothly running OS without heavy background tasks.
• Browser: Keep your browser updated and avoid too many open tabs during tele-op.
• Login: Avoid logging into the same account from multiple locations while queuing or controlling, otherwise an invalid token error will be reported.`,
    sourceNote: 'PrismaX User Manual — Section 1.1'
  },
  {
    id: 'teleop-queuing',
    category: 'teleop',
    question: 'What should I do while waiting in the queue?',
    answer: `Please keep a close eye on the queue status and be ready before your turn starts:
• A red dot may appear on your browser tab when you are among the top 3 users in the queue.
• Browser notifications may appear when you reach around 5 users ahead and 2 users ahead.
• Keep the page open and avoid refreshing when your turn is close unless the page is clearly stuck.
• Be ready to start your session immediately when it is your turn.`,
    sourceNote: 'PrismaX User Manual — Section 1.1'
  },
  {
    id: 'teleop-inactivity',
    category: 'teleop',
    question: 'Why was my session released due to inactivity?',
    answer: `The system may automatically release your session if no operation is detected for more than 30 seconds.
• Keep interacting with the controls during your session.
• If the system shows an inactivity message even though you were active, please open a ticket with a screen recording and timestamp.`,
    sourceNote: 'PrismaX User Manual — Section 1.1'
  },
  {
    id: 'teleop-fast-track',
    category: 'teleop',
    question: 'Why did other users, especially Innovators, join ahead of me in the queue?',
    answer: `Innovator members have Fast Track benefits, which can place them ahead in the queue according to the current system design.
• Queue movement may change when members with Fast Track enter the queue.
• Please keep watching the queue status when your turn is close.
• If your queue position is clearly stuck or you are repeatedly removed from the queue, open a ticket with screenshots or recordings.`,
    sourceNote: 'PrismaX User Manual — Section 1.2'
  },
  {
    id: 'teleop-fast-track-shared',
    category: 'teleop',
    question: 'Is the Fast Track limit shared across different arms?',
    answer: `Yes. The Fast Track limit is shared across arms under the current design.
• If you use Fast Track on one arm, it may reduce your remaining Fast Track chances for other arms.
• If the system says you reached the daily limit, please check whether you already used Fast Track on another arm.`,
    sourceNote: 'PrismaX User Manual — Section 1.2'
  },
  {
    id: 'teleop-queue-disconnect',
    category: 'teleop',
    question: 'I was disconnected from the queue. Why did this happen?',
    answer: `Common reasons include inactivity, system maintenance, temporary server release, or an unstable connection.
• If you are inactive for more than 30 seconds during control, the system may release your session.
• System release or maintenance may restart queue status.
• If it happens repeatedly, open a ticket with your email, wallet, arm name, time, and screen recording if possible.`,
    sourceNote: 'PrismaX User Manual — Section 1.2'
  },
  {
    id: 'teleop-invalid-token',
    category: 'teleop',
    question: 'What does "Invalid Token" or "Invalid Control Token" mean?',
    answer: `This can happen when your account token becomes outdated or mismatched. For example, your account may have been refreshed or logged in from another location, but the old page is still remaining in the queue.
• Re-login immediately if you see this error.
• Enter the live room again after logging in.
• Avoid logging into the same account from multiple devices or locations while queuing.
• If re-login does not fix the issue, open a ticket with a screenshot, timestamp, arm name, email, and wallet address.`,
    sourceNote: 'PrismaX User Manual — Section 1.3'
  },
  {
    id: 'teleop-connection-error',
    category: 'teleop',
    question: 'What should I do if I see a "Control connection error"?',
    answer: `A control connection error usually means the connection between your session and the robot arm control server failed.
• Refresh the page once.
• Re-login and re-enter the live room.
• Check that your network is stable.
• If you lost a session attempt or points because of this, open a ticket with evidence.`,
    sourceNote: 'PrismaX User Manual — Section 1.3'
  },
  {
    id: 'teleop-stuck-timer',
    category: 'teleop',
    question: 'What should I do if the queue or timer is stuck at 00:00?',
    answer: `This may be caused by a temporary queue or server issue.
• Wait briefly to see whether the queue resumes.
• Refresh only if the page remains stuck for a long time.
• If the issue repeats, open a ticket with the arm name, time, screenshot, and your account information.`,
    sourceNote: 'PrismaX User Manual — Section 1.3'
  },
  {
    id: 'teleop-coming-soon',
    category: 'teleop',
    question: 'What if I see "Coming Soon" when it is my turn?',
    answer: `This may be a temporary status display issue or session access issue.
• Refresh the page once.
• Re-login and check again.
• If it prevents you from teleoperating or earning points, open a ticket with screenshots and timestamps.`,
    sourceNote: 'PrismaX User Manual — Section 1.3'
  },
  {
    id: 'teleop-black-screen',
    category: 'teleop',
    question: 'What should I do if the livestream shows a black screen?',
    answer: `Please try the following troubleshooting steps:
• Refresh the website.
• Clear YouTube cache in Chrome: Settings > Privacy and security > Third-party cookies > See all site data and permissions > Find YouTube > Delete it.
• Re-login to obtain the newest authentication token.
• Re-enter the live room and check whether the stream is restored.`,
    sourceNote: 'PrismaX User Manual — Section 1.4'
  },
  {
    id: 'teleop-camera-issues',
    category: 'teleop',
    question: 'What if the camera angle is wrong, upside-down, blocked, or unclear?',
    answer: `If the camera view prevents you from operating normally, please report it with evidence:
• Provide the arm name (e.g. Arena Arm, Training Arm Gold, Training Arm Black, or Buddy Arm).
• Provide a screenshot or short recording.
• Include the time and timezone when the issue happened.
• Describe whether the issue is camera angle, black screen, blocked view, or upside-down stream.`,
    sourceNote: 'PrismaX User Manual — Section 1.4'
  },
  {
    id: 'teleop-arm-types',
    category: 'teleop',
    question: 'What are the access rules and daily usage limits for different Arm Types?',
    answer: `Arm Types and Usage Logic:
• Training Arm Gold (formerly Training Arm): Amplifier (up to 3× per day), Innovator (up to 6× per day).
• Training Arm Black (new Training Arm option): Amplifier (up to 3× per day), Innovator (up to 6× per day).
• Arena Arm (formerly Buddy Arm): First-Time Amplifier (up to 3×), Innovator (unlimited access).
• Private Arm: Accessible via invitation code only. Reserved for special use cases such as events, content series, and partner activations.`,
    sourceNote: 'PrismaX User Manual — Section 1.5'
  },

  // ---------------------------------------------------------------------------
  // 2. Points, Rewards & Robot System
  // ---------------------------------------------------------------------------
  {
    id: 'points-login-quiz',
    category: 'points',
    question: 'How do I earn daily login, welcome bonus, and quiz points?',
    answer: `Points Earning Methods:
• Daily Login: Log in once per calendar day to claim points.
  - Explorer Member: 10 points/day
  - Standard Member (other tiers except Innovator): 30 points/day
  - Innovator Member: 50 points/day
  - Monad Connection Bonus: Connecting with Monad doubles your daily login points for that day.
• First-Time Welcome Bonus: The first time you claim daily login (when you have 0 points), you receive a 1,000 points welcome bonus.
• Quiz: Complete the 5-question quiz once. Earn 500 points per correct answer, plus an extra 1,000 points bonus if all 5 are correct (up to 3,500 points total).`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-teleop-time-formula',
    category: 'points',
    question: 'How do I earn points when I control a robot (Teleop-time points formula)?',
    answer: `Teleop-time points formula per session:
• First time ever controlling any robot: 3,000 welcome bonus points.
• Active session / Leaving normally: 0.3 × (seconds of control), rounded down.
• Disconnected or timed out (< 1 minute): 0 points.
• Disconnected or timed out (≥ 1 minute): 0.3 × (seconds − 30), rounded down.
Points are earned per second of active control and saved directly to your account.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-robot-arm-types',
    category: 'points',
    question: 'Do all robots give the same points (Arena vs Private vs Training Arms)?',
    answer: `Teleop-time points use the same rules across all robots. However, bonus reward points depend on arm type:
• Arena Arms: Teleop-time points YES + Reward points YES.
• Private Arms: Teleop-time points YES + Reward points YES.
• Training Arms (Black & Gold): Teleop-time points YES + Reward points NO (teleop-time points only).`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-reward-dolls',
    category: 'points',
    question: 'What are reward points and how does object/doll movement calculation work?',
    answer: `After your session, the system compares camera views of the tray before and after control:
• For each doll counted as moving consistently between sides (e.g. left to right), you earn 100 bonus points.
• Consistency Rule: (1) Total count of dolls before and after must match (no dolls added or lost), and (2) any reduction on one side must equal the addition on the opposite side.
• Reward points are added on top of teleop-time points. Only Arena & Private Arms run object checks; Training Arms do not.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-daily-vs-alltime',
    category: 'points',
    question: 'Why did my earned points not appear in Daily Points?',
    answer: `Daily Points only display certain activity points such as daily check-in, chat rewards, and direct tele-op time points. Bonus points earned from successfully moving objects are recorded in the system database and calculated into All PrismaX Points rather than Daily Points.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-object-calculation-issue',
    category: 'points',
    question: 'Why did I move objects but only receive 90 points or unexpected amounts?',
    answer: `Known platform calculation behaviors:
• The object algorithm requires complete, verified movements. Moving an object back and forth may cancel out the movement.
• Refreshing during teleoperation triggers early reward settlement, preventing subsequent movements from counting.
• If you did not refresh and still received incorrect points due to algorithm miscalculation, please open a ticket with evidence.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-low-point-issue',
    category: 'points',
    question: 'Why did I receive very low points (e.g. 1, 8, 13, or 20 points)?',
    answer: `Very low point amounts are usually related to token mismatch, inactive session classification by anti-idle scripts, network interruptions, or early session disconnects. Always re-login before joining a new session and maintain steady control input.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-data-hours-issue',
    category: 'points',
    question: 'Why were my data hours not counted correctly?',
    answer: `Data hours may fail to record if the session is interrupted, the account token becomes outdated, the session is flagged as inactive, or temporary server delays occur. Keep interacting during the session, avoid logging into multiple devices, and submit video proof via a ticket if recurring.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'points-alltime-dropped',
    category: 'points',
    question: 'My All-Time Points dropped or disappeared. What should I do?',
    answer: `First verify your login method. Gmail accounts and wallet accounts record points separately. If you switched login methods (e.g. from Solana wallet to Gmail), you are viewing a different account balance. Log in with the original method or open a ticket with both email and wallet address.`,
    sourceNote: 'PrismaX User Manual — Section 2.1'
  },
  {
    id: 'robot-arm-stuck',
    category: 'points',
    question: 'The robot arm is stuck, slow, stiff, or not moving. What should I do?',
    answer: `Robot arms can become temporarily stuck due to physical position limits, previous session overrides, or server lag. Refresh the page once or try another arm. If the issue persists, report the arm name, exact problem, timestamp, and screen recording in a ticket.`,
    sourceNote: 'PrismaX User Manual — Section 2.2'
  },
  {
    id: 'robot-arm-grip-reach',
    category: 'points',
    question: 'The grip is not closing or the arm cannot reach objects. What should I report?',
    answer: `Please open a ticket with: (1) Arm name, (2) Affected control/movement (e.g. X key, gripper, left/right reach), (3) Video evidence showing arm position, (4) Time and timezone. This allows engineers to calibrate base offsets or hardware grippers.`,
    sourceNote: 'PrismaX User Manual — Section 2.2'
  },

  // ---------------------------------------------------------------------------
  // 3. Account & Login
  // ---------------------------------------------------------------------------
  {
    id: 'account-gmail-vs-wallet',
    category: 'account',
    question: 'Why are my points different when I log in via Gmail vs connecting my wallet?',
    answer: `PrismaX supports two distinct account authorization types:
• Gmail Account: Points earned while logged in via Gmail are tied to your Gmail ID, even if you connect a wallet later.
• Wallet Account: Points earned when connecting via wallet-only (without Gmail login) are recorded under the wallet address.
Switching between Gmail login and wallet-only login switches between two separate account records. Points do not automatically merge.`,
    sourceNote: 'PrismaX User Manual — Section 3.1'
  },
  {
    id: 'account-linked-lower-points',
    category: 'account',
    question: 'I linked my wallet or email and my points look lower. What should I check first?',
    answer: `Check whether you are logged in using the exact original method used when earning points. If your points were earned under a wallet-only login but you are now logged in via Gmail, log out and log back in with the original wallet. If wallet and email are linked incorrectly, unlink them under profile settings.`,
    sourceNote: 'PrismaX User Manual — Section 3.1'
  },
  {
    id: 'account-unlink-wallet',
    category: 'account',
    question: 'How can I unlink my wallet from my email account?',
    answer: `To unlink your wallet from your email account:
1. Log in with your email account.
2. Go to your Account / Profile page.
3. Locate the connected wallet address.
4. Click the "Unlink" button beside your wallet address.
5. Refresh the page to confirm removal.
If the button fails, refresh multiple times or open a ticket with your email, wallet address, and screenshot.`,
    sourceNote: 'PrismaX User Manual — Section 3.2'
  },
  {
    id: 'account-login-failed',
    category: 'account',
    question: 'I cannot log in to my PrismaX account. What should I do?',
    answer: `Try these self-check steps:
• Use a desktop PC browser (Chrome/Edge recommended).
• Ensure you are using the original login method (Gmail, Solana, ETH, OKX, Phantom).
• Clear browser cache and cookies.
• Avoid logging in on multiple devices simultaneously.
• Open a ticket if the login page remains unresponsive.`,
    sourceNote: 'PrismaX User Manual — Section 3.3'
  },
  {
    id: 'account-email-verification-code',
    category: 'account',
    question: 'I cannot receive the email verification code. What should I check?',
    answer: `Check your Spam, Junk, and Promotions folders. Ensure your email is typed correctly and wait 2-3 minutes before requesting a new code. Avoid requesting codes rapidly, as this triggers anti-bot rate limits.`,
    sourceNote: 'PrismaX User Manual — Section 3.3'
  },
  {
    id: 'account-too-many-attempts',
    category: 'account',
    question: 'What does "Too many login attempts detected" mean?',
    answer: `Anti-bot security rate-limiting has been triggered due to frequent requests. Pause for 10-15 minutes, clear browser cache, use a stable connection, and try again without switching wallets rapidly.`,
    sourceNote: 'PrismaX User Manual — Section 3.3'
  },
  {
    id: 'account-social-binding-error',
    category: 'account',
    question: 'I cannot connect Discord, X/Twitter, or Telegram to my PrismaX profile. What should I do?',
    answer: `Use a PC browser, clear browser cache, and re-login to ensure an active authentication token. If the error says "authentication token not found", open a ticket with your email/wallet, browser details, and screenshot.`,
    sourceNote: 'PrismaX User Manual — Section 3.4'
  },
  {
    id: 'account-twitter-relink',
    category: 'account',
    question: 'My old Twitter/X account still appears and I cannot link a new one. What should I do?',
    answer: `Open a support ticket and provide your PrismaX account details, your old linked X username, and the new X handle you wish to bind. The team will manually unbind the legacy handle.`,
    sourceNote: 'PrismaX User Manual — Section 3.4'
  },

  // ---------------------------------------------------------------------------
  // 4. Membership & Payment
  // ---------------------------------------------------------------------------
  {
    id: 'payment-membership-not-activated',
    category: 'payment',
    question: 'I paid for Amplifier or Innovator, but my membership was not activated. What should I do?',
    answer: `Open a ticket with payment verification details:
• Account email or wallet address used during checkout.
• On-chain transaction hash (if paid by crypto wallet).
• Credit card receipt / payment proof (if paid by card).
• Screenshot of your current profile membership status.
• Approximate purchase timestamp and timezone.`,
    sourceNote: 'PrismaX User Manual — Section 4.1'
  },
  {
    id: 'payment-double-charged',
    category: 'payment',
    question: 'I was charged twice. What information should I provide?',
    answer: `For duplicate charge reviews, submit a ticket including:
• Both transaction hashes or credit card receipt IDs.
• Account email and wallet address.
• Payment amounts and timestamps.
• Screenshot showing duplicate billing entries.`,
    sourceNote: 'PrismaX User Manual — Section 4.1'
  },
  {
    id: 'payment-paywall-still-active',
    category: 'payment',
    question: 'I purchased membership but still see a paywall. What should I check?',
    answer: `Log out and log back in using the exact Gmail or wallet account used during purchase. Refresh the page to update cached credentials. If the paywall persists, open a ticket with your transaction hash.`,
    sourceNote: 'PrismaX User Manual — Section 4.1'
  },

  // ---------------------------------------------------------------------------
  // 5. Support & System Reports
  // ---------------------------------------------------------------------------
  {
    id: 'support-report-leaderboard',
    category: 'troubleshooting',
    question: 'How should I report suspicious leaderboard activity or abnormal point gains?',
    answer: `Submit an evidence-based report via support ticket including:
• Suspected wallet address or displayed account handle.
• Screenshots showing abnormal point/hour jumps.
• Time period when the spike occurred.
• Explanation of why the rate appears unnatural.
Legitimate investigation requires evidence. Avoid public unverified accusations.`,
    sourceNote: 'PrismaX User Manual — Section 5.1'
  },
  {
    id: 'support-report-malicious-teleop',
    category: 'troubleshooting',
    question: 'How should I report intentional damage or malicious teleoperation?',
    answer: `If an operator intentionally rams robot arms against glass barriers or attempts hardware damage, submit a ticket with: (1) Screen recording/video, (2) Timestamp & timezone, (3) Arm name, (4) Operator handle if visible.`,
    sourceNote: 'PrismaX User Manual — Section 5.1'
  },
  {
    id: 'support-when-to-ticket',
    category: 'troubleshooting',
    question: 'When should I open a support ticket?',
    answer: `Open a ticket when self-check steps fail to resolve issues regarding:
• Unactivated membership after payment or duplicate charges.
• Missing or uncredited points across multiple sessions.
• Unable to log in or receive email verification codes.
• Repeated "Invalid Token" or control connection failures.
• Camera black screen or broken robot arm grippers.
• Leaderboard exploit or malicious teleop reports.`,
    sourceNote: 'PrismaX User Manual — Section 5.2'
  },
  {
    id: 'support-ticket-required-info',
    category: 'troubleshooting',
    question: 'What information should I include in a support ticket?',
    answer: `To help the team resolve your issue quickly, include:
• Discord username and Discord ID.
• PrismaX email address and Wallet address.
• Arm name (if teleop related).
• Transaction hash (if payment related).
• Detailed description, screenshots/video recordings, timestamp & timezone.`,
    sourceNote: 'PrismaX User Manual — Section 5.2'
  },

  // ---------------------------------------------------------------------------
  // 6. Validation Guide
  // ---------------------------------------------------------------------------
  {
    id: 'validation-overview',
    category: 'validation',
    question: 'What is Validation and who can participate?',
    answer: `Validation is the process of reviewing recorded robot episodes on PrismaX to evaluate whether the robot completed tasks according to quality standards.
• Who can participate: Both Amplifier and Innovator members can access Verify Quality review tasks.
• Monthly Limits (non-Validators): Amplifier members (up to 10 reviews/month), Innovator members (up to 30 reviews/month).
• Top 100 Validators: Unlimited monthly review access.`,
    sourceNote: 'PrismaX User Manual — Section 6.1'
  },
  {
    id: 'validation-verify-quality-availability',
    category: 'validation',
    question: 'What is Verify Quality and why are tasks sometimes unavailable?',
    answer: `Verify Quality allows eligible members to review uploaded robot episodes and earn Prisma Points.
• "No available tasks" means all currently uploaded episodes have reached review capacity.
• Datasets are added continuously. Temporary lulls occur naturally between dataset uploads and do not mean the program has ended.`,
    sourceNote: 'PrismaX User Manual — Section 6.2'
  },
  {
    id: 'validation-monthly-limits',
    category: 'validation',
    question: 'Is there a daily or monthly limit for validation reviews?',
    answer: `Review Access Limits:
• Ranked Top 100 Validators: Unlimited daily and monthly review access.
• Non-Validator Amplifier Members: Up to 10 dataset reviews per month.
• Non-Validator Innovator Members: Up to 30 dataset reviews per month.`,
    sourceNote: 'PrismaX User Manual — Section 6.2'
  },
  {
    id: 'validation-evaluation-criteria',
    category: 'validation',
    question: 'How should I evaluate a robot episode (Pass/Fail & Sliding Scale)?',
    answer: `Evaluation Rules:
1. Pass/Fail Checks: Clear camera feeds, task completed as instructed, robot hand in frame, camera views synchronized.
2. Sliding Scale Quality Scores: Smoothness of trajectory, control dexterity, appropriate speed, reaching target state, and introducing novel variations.
Always provide honest, objective ratings based on actual data quality.`,
    sourceNote: 'PrismaX User Manual — Section 6.3'
  },
  {
    id: 'validation-prompt-mismatch',
    category: 'validation',
    question: 'If the prompt describes one task but the robot performs a completely different task, should it be marked as Fail?',
    answer: `Yes. If the robot behavior does not match the requested task instruction, the "Task completed as instructed" criterion must be marked as "Fail".`,
    sourceNote: 'PrismaX User Manual — Section 6.3'
  },
  {
    id: 'validation-out-of-frame',
    category: 'validation',
    question: 'If the robot briefly leaves the camera frame but completes the task correctly, should it be marked as Fail?',
    answer: `Not necessarily. The episode may still PASS if the arm is out of frame only briefly, critical actions (grasping, placement) remain visible, or secondary camera angles cover the missing view. Mark down or FAIL only if the hidden moment hides a critical action so you cannot verify task success.`,
    sourceNote: 'PrismaX User Manual — Section 6.3'
  },
  {
    id: 'validation-fail-complete-all-scores',
    category: 'validation',
    question: 'If I mark an episode as Fail, do I still need to complete the remaining quality scores?',
    answer: `Yes. You must score every criterion fully, even if you marked one check as Fail. Do not leave fields blank.`,
    sourceNote: 'PrismaX User Manual — Section 6.3'
  },
  {
    id: 'validation-video-dragging',
    category: 'validation',
    question: 'Does watching the video by dragging the timeline count as review time?',
    answer: `No. The system requires actual review time. Dragging or skipping through the video timeline invalidates review time and does not count as a valid evaluation.`,
    sourceNote: 'PrismaX User Manual — Section 6.3'
  },
  {
    id: 'validation-reward-calculation',
    category: 'validation',
    question: 'How are Validation rewards calculated (±15% consensus rule & 100 points reward)?',
    answer: `Reward Rules:
• You earn 100 Prisma Points per accurate review.
• A review is accurate when BOTH: (1) Your Pass/Fail selection matches final consensus, and (2) Your quality score falls within the ±15% accepted range around consensus.
• Ratings outside the ±15% range earn 0 points.`,
    sourceNote: 'PrismaX User Manual — Section 6.4'
  },
  {
    id: 'validation-high-ratings-farming',
    category: 'validation',
    question: 'Does giving higher ratings increase my chance of receiving points?',
    answer: `No. Giving high ratings does NOT increase rewards. Rewards are based solely on accuracy relative to consensus. Point farming or submitting dishonest high ratings can cause loss of Validator status.`,
    sourceNote: 'PrismaX User Manual — Section 6.4'
  },
  {
    id: 'validation-consensus-pending',
    category: 'validation',
    question: 'Why can some validation review rewards stay pending for a long time?',
    answer: `Pending status means the episode has not reached consensus yet. This happens when more reviews are required, validator scores have large variance, or the episode has moved into higher review rounds.`,
    sourceNote: 'PrismaX User Manual — Section 6.5'
  },
  {
    id: 'validation-three-rounds',
    category: 'validation',
    question: 'What are the review rounds (First Round, Second Round, Expert Review)?',
    answer: `Verification Multi-Round System:
• Round 1: Reviewed by Amplifier, Innovator, and Validator members. If consensus is reached, points are distributed.
• Round 2: If Round 1 lacks consensus, the episode enters Round 2, reviewed by Senior Validators for higher accuracy.
• Expert Review: If consensus remains unconfirmed, PrismaX expert team members step in to conduct final review and conclude consensus.`,
    sourceNote: 'PrismaX User Manual — Section 6.5'
  },
  {
    id: 'validation-leaderboard-rotation',
    category: 'validation',
    question: 'How does the Validator Leaderboard & monthly rotation work (The First 100 & Senior Validators)?',
    answer: `Validator Leaderboard & Selection:
• Rankings update daily at 00:00 UTC based on cumulative validation points.
• There are 100 Validator spots. On monthly review: the bottom 25% lowest scoring Validators are rotated out, and the top 25 non-Validator contributors are promoted.
• Senior Validators: 20 Senior Validators are selected from the Top 100 based on scoring accuracy on complex datasets.`,
    sourceNote: 'PrismaX User Manual — Section 6.6'
  },
  {
    id: 'validation-grace-period',
    category: 'validation',
    question: 'What is the grace period for new Validators and what benefits do they receive?',
    answer: `Newly granted Validators receive a grace period exempting them from end-of-month rotation during their first full month (effectively giving ~2 months of status). Benefits include unlimited monthly review access and trusted Validator status.`,
    sourceNote: 'PrismaX User Manual — Section 6.6'
  },
  {
    id: 'validation-no-tasks-bug',
    category: 'validation',
    question: 'My dashboard shows no available tasks. Is this a bug?',
    answer: `Usually not. Top 100 Validators have unlimited access, so available episodes are reviewed rapidly. "No available tasks" simply means existing uploads are cleared and awaiting the next dataset batch.`,
    sourceNote: 'PrismaX User Manual — Section 6.7'
  },

  // ---------------------------------------------------------------------------
  // 7. Owner-operator Guidance
  // ---------------------------------------------------------------------------
  {
    id: 'owner-upload-data',
    category: 'owner_operator',
    question: 'What is Upload Data and who can upload robot data?',
    answer: `Upload Data allows verified hardware operators to submit teleoperation logs (MCAP format + video) to PrismaX.
• Who can upload: Approved hardware operators who have registered supported robot devices (Agilex Robotics, Airbot, I2RT Robotics, or Realman) at app.prismax.ai/data/upload.
• Submitted datasets enter Verify Quality for community validation after passing automated pre-checks.`,
    sourceNote: 'PrismaX User Manual — Section 7'
  },
  {
    id: 'owner-robot-fleet-earnings',
    category: 'owner_operator',
    question: 'What is Robot Fleet and how can owner-operators earn an estimated $1,200/week?',
    answer: `Robot Fleet (app.prismax.ai/data/fleet) is the hardware marketplace where users purchase validated physical robot arms (Piper, TOK2, YAM) with turnkey setup included.
• Owner-Operators collect qualified teleop data using their physical robot arms.
• Earn an estimated $1,200/week by collecting qualified teleoperation data.
• Direct Onboarding Support: Interested buyers can contact Max on Discord (maxcc0294_26680) to schedule a team calendar call.`,
    sourceNote: 'PrismaX User Manual — Section 7'
  }
];
