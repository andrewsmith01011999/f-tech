import { FeedbackStatus } from "@/stores/feedback/feedback";

export const mapFeedbackStatusColor = (status: FeedbackStatus) => {
  switch (status) {
    case "PENDING":
      return "#FEC53D"
    case "APPROVED":
      return '#4AD991';
    case "REJECTED":
      return '#F93C65';
    default:
      return '#FEC53D';
  }
}