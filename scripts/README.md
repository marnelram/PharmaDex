# Database Scripts

This directory contains database seeding and management scripts for the DrugOrPokemon app.

## Facts Quiz Questions Scripts

### Available Scripts

Run these commands from the **project root directory**:

```bash
# Add 10 new facts quiz questions (5 Pokémon + 5 Drug questions)
npm run db:seed-facts

# Clear ALL facts quiz data (questions, attempts, answers)
npm run db:clear-facts

# Clear all data and add fresh questions (fresh start)
npm run db:seed-facts-fresh
```

### Question Details

The seeding script adds:

**🎮 Pokémon Questions (5 total):**

- **Easy (2)**: Basic Pokémon knowledge (Pikachu, Magikarp evolution)
- **Medium (2)**: Type combinations, move mechanics
- **Hard (1)**: Legendary Pokémon lore (Arceus)

**💊 Drug Questions (5 total):**

- **Easy (2)**: Common medications (Tylenol, NSAIDs)
- **Medium (2)**: Drug classes, hormone regulation
- **Hard (1)**: Mechanism of action (Warfarin)

Each question includes:

- ✅ Correct answer
- ❌ 3 plausible wrong answers
- 📚 Educational explanation
- 🎯 Difficulty level (easy/medium/hard)
- 🏷️ Category (pokemon/drug)

### Scoring System

Questions are scored based on difficulty:

- **Easy**: 100 points
- **Medium**: 200 points
- **Hard**: 300 points

### Safety Notes

⚠️ **WARNING**: The `clear` script will delete ALL facts quiz data including:

- All facts questions
- All user quiz attempts
- All user answers

Only use this for development/testing purposes!

### Adding More Questions

To add your own questions, edit `scripts/seed-facts-questions.ts` and add them to the appropriate arrays:

- `pokemonQuestions` - for Pokémon-related questions
- `drugQuestions` - for medication-related questions

Then run `npm run db:seed-facts` to add them to the database.
