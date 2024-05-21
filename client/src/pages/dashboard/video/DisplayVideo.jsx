import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssessments, fetchCriteria } from "@/redux/assessment/assessmentSlice";
import convertDateTime from "@/utils/convertDateTime";

const formatMovementType = (movementType) => {
    return movementType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

function DisplayVideo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { videos } = useSelector((state) => state.video);
    const { assessments, isLoading, isError } = useSelector((state) => state.assessment);
    const { criteria } = useSelector((state) => state.assessment);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const foundVideo = videos.find((v) => v.id === parseInt(id));
        setVideo(foundVideo);
        if (foundVideo) {
            dispatch(fetchAssessments(foundVideo.id));
            dispatch(fetchCriteria());
        }
    }, [id, videos, dispatch]);

    if (!video) {
        return <div>Loading...</div>;
    }

    // Filter criteria based on the movement type of the video
    const criteriaWithMatchingMovementType = criteria.filter(criterion => criterion.movement_type === video.movement_type);

    // Filter assessments based on the movement type of criteria
    const filteredAssessments = assessments.filter(assessment =>
        criteria.find(criterion => criterion.id === assessment.criterion.id && criterion.movement_type === video.movement_type)
    );

    // Group filtered assessments by criterion ID
    const groupedAssessments = {};
    filteredAssessments.forEach(assessment => {
        if (!groupedAssessments[assessment.criterion.id]) {
            groupedAssessments[assessment.criterion.id] = {
                criterion: assessment.criterion,
                firstTrial: null,
                secondTrial: null
            };
        }

        if (assessment.trial.trial_type === 'first_trial') {
            groupedAssessments[assessment.criterion.id].firstTrial = assessment;
        } else if (assessment.trial.trial_type === 'second_trial') {
            groupedAssessments[assessment.criterion.id].secondTrial = assessment;
        }
    });

    return (
        <div className="flex gap-4 justify-center">
            <div className="flex flex-1 flex-col gap-3">
                <video className="w-full rounded-lg" controls autoPlay loop>
                    <source src={video.video} type="video/mp4" />
                </video>
                <h1 className="text-3xl font-bold">{formatMovementType(video.movement_type)}</h1>
                <span className="text-xl font-semibold">{video.client_name}</span>
                <span>{convertDateTime(video.upload_date)}</span>
            </div>
            <div className="flex flex-1 flex-col gap-3">
                <h2 className="text-2xl font-bold">{formatMovementType(video.movement_type)} Assessment</h2>
                {isLoading ? (
                    <div>Loading assessments...</div>
                ) : isError ? (
                    <div>Error loading assessments.</div>
                ) : (
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Criteria</th>
                                <th className="px-4 py-2">1st Trial</th>
                                <th className="px-4 py-2">2nd Trial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criteriaWithMatchingMovementType.map(criterion => (
                                <tr key={criterion.id}>
                                    <td className="border px-4 py-2">{criterion.description}</td>
                                    <td className="border px-4 py-2">{groupedAssessments[criterion.id]?.firstTrial ? (groupedAssessments[criterion.id].firstTrial.is_met ? '✔' : '✘') : '-'}</td>
                                    <td className="border px-4 py-2">{groupedAssessments[criterion.id]?.secondTrial ? (groupedAssessments[criterion.id].secondTrial.is_met ? '✔' : '✘') : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default DisplayVideo;
