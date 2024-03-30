function SmallDetailsCard({ title, value }) {
	return (
		<div className="border w-full rounded-[8px] border-[--lines] px-3 py-2 space-y-1 flex flex-col justify-center items-start font-medium self-stretch text-sm truncate">
			<span className="text-[--placeholder] text-[12px]  ">{title} </span>
			<span className="text-[14px] truncate">{value}</span>
		</div>
	);
}

export default SmallDetailsCard;
