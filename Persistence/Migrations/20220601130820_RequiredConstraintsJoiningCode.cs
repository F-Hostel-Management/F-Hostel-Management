using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RequiredConstraintsJoiningCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "_6DigitCode",
                table: "JoiningCodes",
                newName: "SixDigitsCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SixDigitsCode",
                table: "JoiningCodes",
                newName: "_6DigitCode");
        }
    }
}
