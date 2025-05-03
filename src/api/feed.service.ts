import api from ".";
import { IFeed, ICreateFeedPayload } from "../types/feed/feed.types";

export const FeedService = {
    async getFeed(): Promise<IFeed[]> {
        const { data } = await api.get<IFeed[]>('feed');
        return data;
    },

    async getFeedById(id: number): Promise<IFeed> {
        const { data } = await api.get<IFeed>(`feed/${id}`);
        return data;
    },

    async getFeedByUser(userId: number): Promise<IFeed[]> {
        const { data } = await api.get<IFeed[]>(`feed/user/${userId}`);
        return data;
    },

    async getFeedByTaggedUser(userId: number): Promise<IFeed[]> {
        const { data } = await api.get<IFeed[]>(`feed/tagged/user/${userId}`);
        return data;
    },

    async getFeedByTaggedRole(roleId: number): Promise<IFeed[]> {
        const { data } = await api.get<IFeed[]>(`feed/tagged/role/${roleId}`);
        return data;
    },

    async createFeed(feedData: ICreateFeedPayload): Promise<IFeed> {
        const { data } = await api.post<IFeed>('feed', feedData);
        return data;
    }
}; 