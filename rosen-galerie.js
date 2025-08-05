const tokenURIs = [
  "./Quantum_Metadata/0001.json",
  "./Quantum_Metadata/0002.json",
  "./Quantum_Metadata/0003.json",
  "./Quantum_Metadata/0004.json",
  "./Quantum_Metadata/0005.json",
  "./Quantum_Metadata/0006.json",
  "./Quantum_Metadata/0007.json",
  "./Quantum_Metadata/0008.json",
  "./Quantum_Metadata/0009.json",
  "./Quantum_Metadata/0010.json"
];

async function loadMetadata() {
  const gallery = document.getElementById("gallery");

  for (let uri of tokenURIs) {
    try {
      const response = await fetch(uri);
      const metadata = await response.json();

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}" alt="${metadata.name}" />
        <h3>${metadata.name}</h3>
        <p>${metadata.description}</p>
        <div class="attributes">
          ${metadata.attributes
            .map(attr => `
              <div class="attribute">
                <strong>${attr.trait_type}:</strong> ${attr.value}
              </div>
            `).join("")}
        </div>
        <a class="opensea" href="https://opensea.io/assets?search[query]=${encodeURIComponent(metadata.name)}" target="_blank">
          Auf OpenSea ansehen
        </a>
      `;

      gallery.appendChild(card);
    } catch (e) {
      console.error("Fehler beim Laden:", uri, e);
    }
  }
}

loadMetadata();