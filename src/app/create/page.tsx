import { 
    DefaultSection,
    TextSection,
    MathSection,
    ImageSection,
    TableSection,
    VideoSection,
    AudioSection,
    MultipleChoiceSection,
} from "~/components/sections"

function Page() {
    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col w-[640px] gap-2">
                <DefaultSection />
                <MathSection />
                <TextSection />
                <ImageSection />
                <TableSection />
                <VideoSection />
                <AudioSection />
                <MultipleChoiceSection />
            </div>
        </div>
    )
}

export default Page
