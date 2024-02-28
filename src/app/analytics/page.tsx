import { analytics } from '@/utils/analytics';

export const Page = async () => {
    const pageView = await analytics.retrieve('pageView');
    return <div>Hi!</div>;
};
export default Page;
