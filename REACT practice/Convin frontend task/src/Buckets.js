import { useState } from "react";
import { Modal } from "./modal";
import { BucketInput, CardInput } from "./bucketInput";
import "./Card.css";
export const Buckets = ({ data }) => {
  const { historyData, setHistoryData } = data;
  const [currentVideo, setCurrentVideo] = useState("");
  const [cardsIds, setCardsIds] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [randId, setRandId] = useState(3);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Example Card",
      url: "https://www.youtube.com/watch?v=9VNI3s7rUoQ",
      bucketId: 1
    }
  ]);
  const [buckets, setBuckets] = useState([{ name: "Default Bucket", id: 1 }]);

  const setCardsIdHandler = (cardId, e) => {
    // console.log(cardId, "cardids");
    if (e.target.checked) {
      setCardsIds([...cardsIds, cardId]);
    } else {
      const newIds = cardsIds.filter((id) => id !== cardId);
      setCardsIds(newIds);
    }
  };

  const deleteCards = () => {
    let newCards = cards;
    for (let i = 0; i < cardsIds.length; i++) {
      newCards = newCards.filter((card) => card.id !== cardsIds[i]);
    }
    setCardsIds([]);
    setCards(newCards);
  };

  const addBucket = (name) => {
    if (name === "") {
      return;
    }
    const obj = { name, id: randId };
    setRandId(randId + 1);
    setBuckets([...buckets, obj]);
  };
  const handleDeleteCard = (cardId) => {
    const newCards = cards.filter((card) => card.id !== cardId);

    const newCardIds = cardsIds.filter((id) => id !== cardId);
    setCards(newCards);
    setCardsIds(newCardIds);
  };

  const handleEditCard = (card) => {
    setCurrentItem(card);
  };

  const handleSaveCard = (event) => {
    event.preventDefault();
    const { name, url, bucketId } = event.target.elements;
    const newCards = cards.map((card) =>
      card.id === currentItem.id
        ? {
            ...card,
            name: name.value,
            url: url.value,
            bucketId: parseInt(bucketId.value)
          }
        : card
    );
    setCards(newCards);
    setCurrentItem(null);
  };

  const handleCancelEdit = () => {
    setCurrentItem(null);
  };

  // Show video
  const handleShowvideoandhistory = (card) => {
    setCurrentVideo(card.url);
    const date = new Date();

    const obj = { name: card.name, url: card.url, time: date.toString() };
    setHistoryData([...historyData, obj]);
  };
  // const showVideo

  // console.log(cardsIds, "csdfsf");

  return (
    <div className="container">
      <div className="mb-3">
        <BucketInput addBucket={addBucket} />
        <CardInput
          data={{ buckets, cards, setCards, randId, setRandId }}
          onEditCard={handleEditCard}
        />
      </div>
      {cardsIds.length > 0 && (
        <button onClick={deleteCards}>Delete selected cards</button>
      )}
      {buckets.map((bucket) => (
        <div key={bucket.id} className="bucket">
          <h1>{bucket.name}</h1>

          {cards
            .filter((card) => card.bucketId === bucket.id)
            .map((card, i) => (
              <div key={i} className="card">
                {currentItem && currentItem.id === card.id ? (
                  <form onSubmit={handleSaveCard}>
                    <input
                      class="form-control mb-2"
                      type="text"
                      name="name"
                      defaultValue={card.name}
                    />
                    <input
                      class="form-control mb-2"
                      type="text"
                      name="url"
                      defaultValue={card.url}
                    />
                    <select
                      class="form-select mb-2"
                      name="bucketId"
                      defaultValue={card.bucketId}
                    >
                      {buckets.map((bucket) => (
                        <option key={bucket.id} value={bucket.id}>
                          {bucket.name}
                        </option>
                      ))}
                    </select>
                    <button
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      style={{ marginRight: "5px" }}
                      className="btn btn-success"
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div>
                    <div>
                      <div className="">
                        {card.name.toUpperCase()} -{" "}
                        <button
                          onClick={() => handleShowvideoandhistory(card)}
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Show Video
                        </button>
                        <Modal url={currentVideo} />
                      </div>
                      <div>
                        CheckBox :
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onClick={(e) => setCardsIdHandler(card.id, e)}
                        />
                      </div>
                    </div>

                    <button
                      style={{ marginRight: "5px" }}
                      className="btn btn-success"
                      onClick={() => handleEditCard(card)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
