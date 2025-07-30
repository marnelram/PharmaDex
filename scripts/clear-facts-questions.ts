const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function clearFactsQuestions() {
  try {
    console.log("🗑️  Starting to clear facts questions...");

    // First, delete all related answers to avoid foreign key constraints
    const deletedAnswers = await prisma.factsQuizAnswer.deleteMany();
    console.log(`   • Deleted ${deletedAnswers.count} quiz answers`);

    // Then delete all quiz attempts
    const deletedAttempts = await prisma.factsQuizAttempt.deleteMany();
    console.log(`   • Deleted ${deletedAttempts.count} quiz attempts`);

    // Finally, delete all facts questions
    const deletedQuestions = await prisma.factsQuestion.deleteMany();
    console.log(`   • Deleted ${deletedQuestions.count} facts questions`);

    console.log("\n✅ All facts quiz data has been cleared from the database!");
  } catch (error) {
    console.error("❌ Error clearing facts questions:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearFactsQuestions()
    .then(() => {
      console.log("🎉 Clearing completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Clearing failed:", error);
      process.exit(1);
    });
}

module.exports = clearFactsQuestions;
