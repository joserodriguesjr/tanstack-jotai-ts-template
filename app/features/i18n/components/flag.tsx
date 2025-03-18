export const Flag = ({
    image,
    isSelected,
    onClick }: { image: string, isSelected: boolean, onClick: () => void }) => (
    <img
        src={image}
        alt="flag"
        onClick={onClick}
        className={`w-6 h-6 cursor-pointer transition-all ${isSelected ? '' : 'grayscale opacity-50'}`}
    />
)
