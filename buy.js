const client = new Appwrite.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("686b85470029b0abd0e8"); // ✅ your project ID

const databases = new Appwrite.Databases(client);

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const crop = document.getElementById("crop").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Searching...</p>";

  try {
    const response = await databases.listDocuments(
      "686b857300047cc7dd66", // ✅ your DB ID
      "686b85ae000b823a9ea7", // ✅ your Collection ID
      [
        Appwrite.Query.equal("crop", crop)
      ]
    );

    const docs = response.documents;
    if (docs.length === 0) {
      resultsDiv.innerHTML = "<p>No matching results found 😔</p>";
      return;
    }

    resultsDiv.innerHTML = "";
    docs.forEach((doc) => {
      const card = document.createElement("div");
      card.classList.add("result-card");
      card.innerHTML = `
        <h3>${doc.name}</h3>
        <p><strong>Crop:</strong> ${doc.crop}</p>
        <p><strong>Phone:</strong> ${doc.phone}</p>
        <p><strong>Address:</strong> ${doc.address}</p>
        <p><strong>Area:</strong> ${doc.area} acres</p>
      `;
      resultsDiv.appendChild(card);
    });

  } catch (error) {
    console.error("Query failed:", error);
    resultsDiv.innerHTML = "<p>Error fetching results.</p>";
  }
});
