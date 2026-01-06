import React from "react";
import Image from "next/image";

type ChildPropertyCardProps = {
  child: any;
  cardImages: string[];
  isDarkMode: boolean;
  onViewMore: () => void;
};

const ChildPropertyCard: React.FC<ChildPropertyCardProps> = ({ child, cardImages, isDarkMode, onViewMore }) => (
  <div className={`rounded-xl shadow-lg border flex flex-row transition-colors duration-300 overflow-hidden w-full max-w-3xl ${isDarkMode ? "bg-black border-white text-white" : "bg-white border-blue-200 text-black"}`} style={{ minHeight: "120px" }}>
    <div className="w-40 h-40 relative">
      <Image src={cardImages[0]} alt={child.projectName || child.propertyName || "Child Property"} width={100} height={60} className="object-cover w-full h-full" style={{ objectFit: "cover" }} />
      {cardImages.length > 1 && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0zm3.5-5a5 5 0 1 0 0 10A5 5 0 0 0 8 3z" /></svg>{cardImages.length}
        </div>
      )}
    </div>
    <div className="flex flex-col justify-between p-2">
      <div>
        <div className="flex flex-col gap-1 ">
          <span className="font-bold text-2xl">{child.propertyName || child.projectName || "Child Property"}</span>
          <span className="text-lg  capitalize font-extrabold">{child.propertyType || "-"}</span>
        </div>
        <div className="flex flex-row gap-4 mt-2">
          <span className="text-lg font-extralight"><b>Price:</b> {child.price || "-"}</span>
          <span className="text-lg font-extralight"><b>Size:</b> {child.size || (child.minSize ? `${child.minSize}${child.sizeUnit ? ` ${child.sizeUnit}` : ""}` : "-")}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-base mb-3">
          {child.roomType && (<span className="flex items-center gap-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>{child.roomType}</span>)}
          {child.bathroomType && (<span className="flex items-center gap-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 10v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" /><path d="M3 10h18" /></svg>{child.bathroomType}</span>)}
          {child.kitchenType && (<span className="flex items-center gap-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>{child.kitchenType}</span>)}
        </div>
      </div>
      <div className="mt-2">
        <button className="text-blue-600 font-semibold flex items-center  hover:underline text-md" onClick={onViewMore}>
          View More Details <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
);

export default ChildPropertyCard;
