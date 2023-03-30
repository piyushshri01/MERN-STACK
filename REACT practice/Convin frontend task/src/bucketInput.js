import { useState } from "react";

export const BucketInput = ({ addBucket }) => {
  const [bucketName, setBucketName] = useState("");
  return (
    <div>
      <h1>Add Bucket</h1>

      <input
        className="form-control mb-2"
        type="text"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
      />
      <button
        className="btn btn-success"
        onClick={() => {
          addBucket(bucketName);
          setBucketName("");
        }}
      >
        add Bucket
      </button>
    </div>
  );
};

export const CardInput = ({ data }) => {
  const { buckets, setCards, cards, randId, setRandId } = data;
  const [card, setCard] = useState({ name: "", url: "", bucketId: 1, id: 0 });
  const addCard = () => {
    setCards([
      ...cards,
      { ...card, id: randId, bucketId: parseInt(card.bucketId) }
    ]);
    setRandId(randId + 1);
  };
  // console.log(cards, "randId");

  return (
    <div className="mb-3 mt-5">
      <h1>Add Card</h1>
      <input
        type="text"
        value={card.name}
        className="form-control mb-2"
        onChange={(e) => setCard({ ...card, name: e.target.value })}
        placeholder="card name"
      />
      <input
        type="text"
        value={card.url}
        className="form-control mb-2"
        onChange={(e) => setCard({ ...card, url: e.target.value })}
        placeholder="card url"
      />
      <select
        name="buckets"
        className="form-select mb-2"
        onChange={(e) => setCard({ ...card, bucketId: e.target.value })}
      >
        {buckets.map((bucket) => (
          <option key={bucket.id} value={bucket.id}>
            {bucket.name}
          </option>
        ))}
      </select>
      <button className="btn btn-success" onClick={addCard}>
        add Card
      </button>
    </div>
  );
};
