import { request } from '@/apis/request';
import { feedbackKeys } from '@/consts/factory/feedback';
import { CreateFeedbackPayload, Feedback } from '@/types/feedback/feedback';
import { PaginationParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AccountReport, PostReport } from '@/types/report/report';
import { reportKeys } from '@/consts/factory/report';

export type FeedbackListingParams = PaginationParams;

type FeedbackListingProps = {};

export const useReportPostsListing = () => {
    const fetchPostReport = async () => {
        const { entity } = await request<PostReport[]>(
            'get',
            '/post-report/getall',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<PostReport[]>({
        queryKey: reportKeys.reportPostListing(),
        queryFn: fetchPostReport,
        placeholderData: keepPreviousData,
    });
};

export const useReportAccountListing = () => {
      const fetchAccountReport = async () => {
          const { entity } = await request<AccountReport[]>(
              'get',
              '/report-account/get-all',
              {},
              {
                  paramsSerializer: {
                      indexes: null,
                  },
              },
          );

          return entity;
      };

      return useQuery<AccountReport[]>({
          queryKey: reportKeys.reportAccountListing(),
          queryFn: fetchAccountReport,
          placeholderData: keepPreviousData,
      });
}
