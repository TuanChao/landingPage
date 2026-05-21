using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZwcadVietnam.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadSource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SourceSlug",
                table: "Contacts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceVariant",
                table: "Contacts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SourceSlug",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "SourceVariant",
                table: "Contacts");
        }
    }
}
