kubectl delete -f service/storebar/admin/storebar-admin-replicaset.yaml

sleep 10

sudo k3s crictl rmi --prune
kubectl apply -f service/storebar/admin/storebar-admin-replicaset.yaml
kubectl apply -f service/storebar/admin/storebar-admin-service.yaml