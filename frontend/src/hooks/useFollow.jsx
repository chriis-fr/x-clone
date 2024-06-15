import {toast} from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useFollow = () => {
    const queryClient = useQueryClient()

    const {mutate:follow, isPending, error} = useMutation({
        mutationFn: async (userId) => {
            try {
                const res = await fetch(`/api/users/follow/${userId}`, {
                    method: 'POST',
                })

                const data = await res.json()
                if(!res.ok){
                    throw new Error(data.error)
                }
                return data;
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            Promise.all([
            queryClient.invalidateQueries({queryKey: ["suggestedUsers"]}),
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            ])
        },
        onError: () => {
            toast.error(error.message)
        }
    })
    return {follow, isPending}
}

export default useFollow;