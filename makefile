.PHONY: gitOperation dockerOperation buildanddeploy

# Usage		: make gitOperation mvdpbranch=branch_name projectbranch=branch_name corepagebranch=branch_name
# Example	: make gitOperation mvdpbranch=dev/ajinomoto projectbranch=dev/ajinomoto corepagebranch=dev/ajinomoto
gitOperation:
	# Save current directory location
	$(eval rootFolder := $(shell pwd))

	# 1. Change directory to src/components/complexes and perform git operations
	cd src/components/complexes && \
	git checkout $(projectbranch) && \
	git pull && \
	cd $(rootFolder)

	# 2. Change directory to src/pages/core and perform git operations
	cd src/pages/core && \
	git checkout $(corepagebranch) && \
	git pull && \
	cd $(rootFolder)

	# 3. Change directory to src/pages/solutions and perform git operations
	cd src/pages/solutions && \
	git checkout $(projectbranch) && \
	git pull && \
	cd $(rootFolder)

	# 4. Change directory to src/components/atoms and perform git operations
	cd src/components/atoms && \
	git checkout $(projectbranch) && \
	git pull && \
	cd $(rootFolder)

	# 5. Change directory to src/components/molecules and perform git operations
	cd src/components/molecules && \
	git checkout $(projectbranch) && \
	git pull && \
	cd $(rootFolder)

	# 6. At root folder, perform git checkout develop and git pull
	git checkout $(mvdpbranch) && \
	git pull

# Usage		: make dockerOperation tag=tag
# Example	: make dockerOperation tag=ajinomoto-dev-latest
dockerOperation:
	# 7. Build and Push Image
	docker build -t mvdevops/mvdp:$(tag) --platform linux/amd64 --network=host . && \
	docker push mvdevops/mvdp:$(tag)

# Usage		: make buildanddeploy mvdpbranch=branch_name projectbranch=branch_name corepagebranch=branch_name tag=tag
# Example	: make buildanddeploy mvdpbranch=release/ajinomoto projectbranch=release/ajinomoto corepagebranch=release/ajinomoto tag=ajinomoto-release-latest
buildanddeploy: gitOperation dockerOperation
