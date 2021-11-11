import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export const itunesSettings = {
    itunesApi: "https://itunes.apple.com/",
    searchEndpoint: "search?term=",
    lookupEndpoint: "lookup?id=",
    songEntity: "&entity=song",
    albumEntity: "&entity=album",
    limit: "&limit=200"
};
const { itunesApi, searchEndpoint, songEntity, limit } = itunesSettings;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { song } = req.query;
    const response = await axios.get(`${itunesApi}${searchEndpoint}${song}${songEntity}${limit}`);
    res.json(response.data);
}