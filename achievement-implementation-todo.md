# PharmaDex Achievement System: Implementation Todo List

## 1. Define Achievement Structure

- [x] Create `achievement-defs.ts` file in `src/lib/achievements/` directory
- [x] Define all achievement categories (Quiz Count, Practice Score, Timed Score, etc.)
- [x] For each achievement, include id, name, description, threshold, and icon
- [x] Add helper functions for retrieving achievements by category and ID
- [x] Create a flattened list of all achievements for easy iteration

## 2. Update Database Schema

- [x] Modify `Achievement` model to store only metadata (name, description, icon, category)
- [x] Remove threshold field from database (will be stored in code)
- [x] Ensure `UserAchievement` model connects users to their earned achievements
- [x] Create and run database migration
- [x] Create seed script to populate achievements table from code definitions

## 3. Create Stats Update Utilities

- [x] Create `update-stats.ts` in `src/lib/stats/` directory
- [x] Implement function to initialize stats for new users
- [x] Add utility to update stats after each answer (correctPokemonAnswers, correctDrugAnswers)
- [x] Add utility to update stats after quiz completion (totalQuizzes, perfectQuizzes, fastestQuiz, etc.)
- [x] Ensure utilities handle cases where user stats don't exist yet

## 4. Build Achievement Checking Service

- [x] Create `achievement-service.ts` in `src/lib/achievements/` directory
- [ ] Implement separate checker functions for each achievement category
- [x] Add main function to run all checkers and award new achievements
- [x] Create mechanism to avoid duplicate achievement awards
- [x] Implement function to check achievements specifically after quiz completion

## 5. Create Achievement API Endpoints

- [x] Update or create `route.ts` in `src/app/api/achievements/` directory
- [x] Add GET endpoint to fetch user achievements with completion status
- [x] Add POST endpoint to check and award achievements after quiz completion
- [x] Include logic to group achievements by category for frontend display
- [x] Return recently unlocked achievements separately

## 6. Update Quiz Components

- [x] Modify answer handling functions to track stats after each answer
- [x] Update quiz completion functions to check for achievements
- [x] Implement toast notifications for newly unlocked achievements
- [x] Add achievement checking after both timed and practice quizzes
- [x] Make sure stats are updated correctly based on quiz performance

## 7. Create Toast Notification System

- [x] Create achievement-specific toast component
- [x] Implement confetti effect for achievement unlocks
- [x] Add queue system to display multiple achievements with delay
- [x] Ensure toasts include achievement icon, name, and description
- [x] Style toasts according to the design system

## 8. Update Achievements Page

- [x] Redesign achievements page with tabbed interface
- [x] Add tabs for "All Achievements", "Recently Unlocked", and "In Progress"
- [x] Create achievement card component with appropriate styling
- [x] Implement tooltips to show achievement descriptions
- [x] Add date display for recently unlocked achievements
- [x] Show progress indicators for incomplete achievements

## 9. Test and Debug

- [ ] Test each achievement category separately
- [ ] Create test cases for threshold edge cases
- [ ] Verify toast notifications display correctly
- [ ] Check achievement page rendering and filtering
- [ ] Test achievement progress tracking
- [ ] Debug any issues with achievement detection

## 10. Admin Tools (Optional)

- [ ] Add admin interface for viewing all achievements
- [ ] Create UI for seeing which users have which achievements
- [ ] Add functionality to manually grant achievements for testing
- [ ] Implement achievement statistics for admin dashboard
