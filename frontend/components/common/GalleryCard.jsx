export default function GalleryCard({ image, onClick }) {
  return (
    <div
      className="p-3 cursor-pointer"
      style={{ flex: "0 0 calc(100% / 4)" }}
      onClick={onClick}
    >
      <div className="w-full h-52 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <img
          src={
            image.src ||
            image.url ||
            image.image ||
            image.imageUrl ||
            image.image_url ||
            image.img ||
            ""
          }
          alt={image.title || ""}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
