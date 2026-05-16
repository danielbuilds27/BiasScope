using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiasAnalyzer.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddWordOccurrences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WordOccurences_TextAnalysisId",
                table: "WordOccurences",
                column: "TextAnalysisId");

            migrationBuilder.AddForeignKey(
                name: "FK_WordOccurences_Analyses_TextAnalysisId",
                table: "WordOccurences",
                column: "TextAnalysisId",
                principalTable: "Analyses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordOccurences_Analyses_TextAnalysisId",
                table: "WordOccurences");

            migrationBuilder.DropIndex(
                name: "IX_WordOccurences_TextAnalysisId",
                table: "WordOccurences");
        }
    }
}
