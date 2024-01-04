import { DB } from "~/types"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card"
import { Button } from "@ui/button"

export function VideoSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Create a new section or drag content from your library
                </CardTitle>
            </CardHeader>
            <CardContent>
                {DB.sections.map(s => <Button key={s} variant="outline">{s}</Button>)}
            </CardContent>
        </Card>
    )
}


